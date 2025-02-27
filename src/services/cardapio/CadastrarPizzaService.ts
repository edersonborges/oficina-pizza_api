import prismaClient from '../../prisma';

interface PizzaItemDTO {
  nome: string;
  descricao: string;
  preco: number;
  subCategoriaId: string; // ID da subcategoria correspondente (ex.: "Pizza → Salgada")
  img_key?: string;       // Opcional: imagem do item
}

interface SaborDTO {
  nome: string;
  descricao: string;
  valor: number;
  img_key?: string;  // Opcional: se vier, cadastramos em arquivos
}

interface MassaDTO {
  nome: string;
  descricao: string;
  valor: number;
  img_key?: string;  // Opcional: se vier, cadastramos em arquivos
}

interface AdicionalDTO {
  nome: string;
  valor: number;
  qntd_min: number;
  qntd_max: number;
}

interface TamanhoDTO {
  nome: string;
  pedacos: number;
  sabores: number; // Quantidade de sabores permitidos para este tamanho
  valor: number;
  ativo?: boolean;
}

interface CadastrarPizzaDTO {
  item: PizzaItemDTO;
  sabores?: SaborDTO[];
  massas?: MassaDTO[];
  adicionais?: AdicionalDTO[];
  tamanhos?: TamanhoDTO[];
}

class CadastrarPizzaService {
  async execute({
    item,
    sabores = [],
    massas = [],
    adicionais = [],
    tamanhos = [],
  }: CadastrarPizzaDTO) {

    // Usamos uma transação para garantir que tudo seja criado ou nada seja persistido
    const result = await prismaClient.$transaction(async (prisma) => {
      // 0) Criar o registro do item (pizza)
      let itemArquivoId: string | undefined;
      if (item.img_key) {
        // Transforma o nome do item conforme a regra: espaços para "_" e minúsculo
        const tipoImg = item.nome.replace(/\s+/g, '_').toLowerCase();
        const arquivo = await prisma.arquivos.create({
          data: {
            img_key: item.img_key,
            tipo: tipoImg,
          },
        });
        itemArquivoId = arquivo.id;
      }

      const pizzaItem = await prisma.itens.create({
        data: {
          nome: item.nome,
          descricao: item.descricao,
          preco: item.preco,
          subCategoriaId: item.subCategoriaId,
          tipoProduto: 'PIZZA', // Identifica o produto como pizza
          imagemId: itemArquivoId ?? null,
          ativo: true,
        },
      });

      // 1) Cadastrar Sabores vinculados ao item
      for (const sabor of sabores) {
        let arquivoId: string | undefined;
        if (sabor.img_key) {
          const tipoImg = sabor.nome.replace(/\s+/g, '_').toLowerCase();
          const arquivo = await prisma.arquivos.create({
            data: {
              img_key: sabor.img_key,
              tipo: tipoImg,
            },
          });
          arquivoId = arquivo.id;
        }

        await prisma.sabores.create({
          data: {
            nome: sabor.nome,
            descricao: sabor.descricao,
            valor: sabor.valor,
            imagemId: arquivoId ?? null,
            ativo: true,
            itemId: pizzaItem.id,  // Associação com o item criado
          },
        });
      }

      // 2) Cadastrar Massas vinculadas ao item
      for (const massa of massas) {
        let arquivoId: string | undefined;
        if (massa.img_key) {
          const tipoImg = massa.nome.replace(/\s+/g, '_').toLowerCase();
          const arquivo = await prisma.arquivos.create({
            data: {
              img_key: massa.img_key,
              tipo: tipoImg,
            },
          });
          arquivoId = arquivo.id;
        }

        await prisma.massas.create({
          data: {
            nome: massa.nome,
            descricao: massa.descricao,
            valor: massa.valor,
            imagemId: arquivoId ?? null,
            ativo: true,
            itemId: pizzaItem.id,  // Associação com o item
          },
        });
      }

      // 3) Cadastrar Adicionais vinculados ao item
      for (const adc of adicionais) {
        await prisma.adicionais.create({
          data: {
            nome: adc.nome,
            valor: adc.valor,
            qntd_min: adc.qntd_min,
            qntd_max: adc.qntd_max,
            ativo: true,
            itemId: pizzaItem.id,  // Associação com o item
          },
        });
      }

      // 4) Cadastrar Tamanhos vinculados ao item
      for (const t of tamanhos) {
        await prisma.tamanhos.create({
          data: {
            nome: t.nome,
            pedacos: t.pedacos,
            sabores: t.sabores,
            valor: t.valor,
            ativo: t.ativo ?? true,
            itemId: pizzaItem.id,  // Associação com o item
          },
        });
      }

      return {
        message: 'Cadastro realizado com sucesso!',
        pizzaItem,
      };
    });

    return result;
  }
}

export { CadastrarPizzaService };
