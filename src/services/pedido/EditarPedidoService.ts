import prismaClient from '../../prisma';
import { PedidoStatus, TipoPedido } from '@prisma/client';

interface EditarPedidoDTO {
  pedidoId: string;
  status?: string;        
  tipoPedido?: string;    
  formaPagamentoId?: string;
  cupomId?: string | null;
  valorTotal?: number | null;
}

class EditarPedidoService {
  async execute(data: EditarPedidoDTO) {
    const { pedidoId, status, tipoPedido, formaPagamentoId, cupomId, valorTotal } = data;

    const pedido = await prismaClient.pedido.findUnique({ where: { id: pedidoId } });
    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }

    const updateData: any = {};

    if (status !== undefined) {
      // Converte a string recebida em um valor do enum
      updateData.status = { set: status as PedidoStatus };
    }
    if (tipoPedido !== undefined) {
      updateData.tipoPedido = { set: tipoPedido as TipoPedido };
    }
    if (formaPagamentoId !== undefined) {
      updateData.formaPagamentoId = formaPagamentoId;
    }
    if (cupomId !== undefined) {
      updateData.cupomId = cupomId;
    }
    if (valorTotal !== undefined) {
      updateData.valorTotal = valorTotal;
    }

    const updated = await prismaClient.pedido.update({
      where: { id: pedidoId },
      data: updateData,
      include: {
        itens: true,
      },
    });

    return updated;
  }
}

export { EditarPedidoService };
