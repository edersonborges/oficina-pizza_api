import prismaClient from '../../prisma';
import { ProdutoTipo } from '@prisma/client';

interface CadastrarItemDTO {
  nome: string;
  descricao: string;
  preco: number;
  subCategoriaId: string; // ID da subcategoria à qual o item pertence
  img_key?: string;       // Opcional: se houver imagem, será salvo em arquivos
  tipoProduto?: string;   // Ex.: "BEBIDA", "PIZZA", etc. (para itens principais, normalmente não é "PIZZA")
}

class CadastrarItemService {
  async execute({
    nome,
    descricao,
    preco,
    subCategoriaId,
    img_key,
    tipoProduto,
  }: CadastrarItemDTO) {
    const result = await prismaClient.$transaction(async (prisma) => {
      let arquivoId: string | undefined;

      if (img_key) {
        // Transforma o nome do item: espaços para "_" e tudo em minúsculo
        const tipoImg = nome.replace(/\s+/g, '_').toLowerCase();
        const arquivo = await prisma.arquivos.create({
          data: {
            img_key,
            tipo: tipoImg,
          },
        });
        arquivoId = arquivo.id;
      }

      // Converte o valor recebido para o enum ProdutoTipo; padrão é OUTRO.
      const tipoProdutoEnum: ProdutoTipo =
        tipoProduto && ProdutoTipo[tipoProduto.toUpperCase() as keyof typeof ProdutoTipo]
          ? ProdutoTipo[tipoProduto.toUpperCase() as keyof typeof ProdutoTipo]
          : ProdutoTipo.OUTRO;

      const item = await prisma.itens.create({
        data: {
          nome,
          descricao,
          preco,
          subCategoriaId,
          tipoProduto: tipoProdutoEnum,
          imagemId: arquivoId ?? null,
          ativo: true,
        },
      });

      return {
        message: 'Item cadastrado com sucesso!',
        item,
      };
    });

    return result;
  }
}

export { CadastrarItemService };
