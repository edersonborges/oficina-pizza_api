import prismaClient from '../../prisma';
import { PedidoStatus, TipoPedido, CupomTipoDesc, CupomPublico } from '@prisma/client';

interface CriarPedidoDTO {
  usuarioId: string;
  tipoPedido?: TipoPedido;      
  formaPagamentoId?: string;    
  cupomId?: string;             
  itens: {
    itemId: string;
    quantidade: number;
    preco: number;
    tamanhoId?: string;
    massaId?: string;
    sabores?: string[];
    adicionais?: {
      adicionalId: string;
      quantidade: number;
      preco: number;
    }[];
  }[];
}

class CriarPedidoService {
  async execute(data: CriarPedidoDTO) {
    const {
      usuarioId,
      tipoPedido,
      formaPagamentoId,
      cupomId,
      itens,
    } = data;

    // 1) Buscamos o usuario
    const user = await prismaClient.usuario.findUnique({
      where: { id: usuarioId },
    });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // 2) Criar o pedido inicial (status = PENDENTE)
    const pedido = await prismaClient.pedido.create({
      data: {
        usuarioId,
        status: PedidoStatus.PENDENTE,
        tipoPedido: tipoPedido ?? TipoPedido.RETIRADA,
        formaPagamentoId,
        cupomId, // Atribui o cupom se veio no DTO (depois validamos)
        dataPedido: new Date(),
      },
    });

    // 3) Criar os itens
    let subtotal = 0;
    for (const item of itens) {
      // Cria item
      const pedidoItem = await prismaClient.pedido_itens.create({
        data: {
          pedidoId: pedido.id,
          itemId: item.itemId,
          quantidade: item.quantidade,
          preco: item.preco,
          tamanhoId: item.tamanhoId,
          massaId: item.massaId,
        },
      });

      // Somar no subtotal
      subtotal += item.preco * item.quantidade;

      // Adicionais
      if (item.adicionais) {
        for (const adc of item.adicionais) {
          await prismaClient.pedido_itens_adc.create({
            data: {
              pedidoItemId: pedidoItem.id,
              adicionalId: adc.adicionalId,
              quantidade: adc.quantidade,
              preco: adc.preco,
            },
          });
          // somar no subtotal
          subtotal += adc.preco * adc.quantidade;
        }
      }

      // Sabores
      if (item.sabores) {
        for (const saborId of item.sabores) {
          await prismaClient.pedido_itens_sabores.create({
            data: {
              pedidoItemId: pedidoItem.id,
              saborId,
            },
          });
        }
      }
    }

    // 4) Calcular desconto do cupom, se existente e válido
    let desconto = 0;
    let valorEntrega = 0; // Se houver ENTREGA e taxa, calcule aqui

    if (cupomId) {
      // Buscar cupom
      const cupom = await prismaClient.cupom_desconto.findUnique({
        where: { id: cupomId },
      });
      if (!cupom) {
        // Remove do pedido (cupom inválido)
        await prismaClient.pedido.update({
          where: { id: pedido.id },
          data: { cupomId: null },
        });
        throw new Error('Cupom não encontrado');
      }

      // Verifica se ainda está no período (dataInicio <= agora <= dataFim)
      const now = new Date();
      if (now < cupom.dataInicio || now > cupom.dataFim) {
        throw new Error('Este cupom está fora do período de validade');
      }

      // Verifica se qntdDisponivel > 0 (se quiser esse controle)
      if (cupom.qntdDisponivel <= 0) {
        throw new Error('Este cupom não está mais disponível');
      }

      // Verifica se o user pode usar (CLIENTES, CLIENTES_NOVOS, ANIVERSARIANTES)
      const podeUsar = await this.validarPublicoCupom(cupom.publico, user);
      if (!podeUsar) {
        throw new Error('Você não se enquadra no público alvo deste cupom');
      }

      // Aplica o desconto
      if (cupom.tipoDesc === CupomTipoDesc.FIXO && cupom.valor) {
        desconto = cupom.valor; // Desconto fixo em reais
      }
      if (cupom.tipoDesc === CupomTipoDesc.PORCENTAGEM && cupom.valor) {
        desconto = (subtotal * cupom.valor) / 100; // ex.: 10 -> 10%
      }
      if (cupom.tipoDesc === CupomTipoDesc.ENTREGA_GRATIS) {
        valorEntrega = 0; // caso tenha taxa de entrega, zerar
      }

      // Decrementar a qntdDisponivel, se quiser
      await prismaClient.cupom_desconto.update({
        where: { id: cupom.id },
        data: {
          qntdDisponivel: { decrement: 1 },
        },
      });
    }

    // 5) Se tipoPedido = ENTREGA, calcule taxa (exemplo simples fixo)
    if (pedido.tipoPedido === TipoPedido.ENTREGA) {
      valorEntrega = 5; // Exemplo fixo, ou busque na tabela de entrega etc.
    }

    // Se for ENTREGA_GRATIS e cupom valendo, zera
    // (já foi feito no if acima, mas validemos novamente)
    // if (cupom?.tipoDesc === CupomTipoDesc.ENTREGA_GRATIS) {
    //   valorEntrega = 0;
    // }

    // 6) Calcula valorTotal
    let valorTotal = subtotal + valorEntrega - desconto;
    if (valorTotal < 0) valorTotal = 0; // Evita negativo

    // 7) Atualiza o pedido com valorTotal
    const pedidoFinal = await prismaClient.pedido.update({
      where: { id: pedido.id },
      data: {
        valorTotal,
      },
      include: {
        itens: {
          include: {
            adicionais: true,
            saboresEscolhidos: true,
          },
        },
        cupom: true,
      },
    });

    return pedidoFinal;
  }

  // Helper para validar se user pode usar o cupom
  private async validarPublicoCupom(publico: CupomPublico, user: any): Promise<boolean> {
    // se for CLIENTES, todo mundo pode
    if (publico === CupomPublico.CLIENTES) return true;

    // se for CLIENTES_NOVOS => user criado a <= 7 dias
    if (publico === CupomPublico.CLIENTES_NOVOS) {
      const diff = new Date().getTime() - new Date(user.createdAt).getTime();
      const days = diff / (1000 * 60 * 60 * 24);
      return days <= 7;
    }

    // se for ANIVERSARIANTES => checar se hj == dataNasc (dia/mes)
    if (publico === CupomPublico.ANIVERSARIANTES && user.dataNasc) {
      const now = new Date();
      const dataNasc = new Date(user.dataNasc);
      return now.getDate() === dataNasc.getDate() && now.getMonth() === dataNasc.getMonth();
    }

    return false;
  }
}

export { CriarPedidoService };
