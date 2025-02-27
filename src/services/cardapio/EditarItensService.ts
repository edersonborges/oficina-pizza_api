import prismaClient from '../../prisma';

interface EditarItensDTO {
  id: string;
  nome?: string;
  descricao?: string;
  preco?: number;
  subCategoriaId?: string;
  img_key?: string; // nova imagem (opcional)
}

class EditarItensService {
  async execute({ id, nome, descricao, preco, subCategoriaId, img_key }: EditarItensDTO) {
    const result = await prismaClient.$transaction(async (prisma) => {
      // Recupera o item atual
      const item = await prisma.itens.findUnique({ where: { id } });
      if (!item) {
        throw new Error('Item não encontrado');
      }
      let arquivoId = item.imagemId;
      // Se nova imagem for enviada:
      if (img_key) {
        if (arquivoId) {
          // Atualiza o registro existente em arquivos
          const tipoImg = (nome || item.nome).replace(/\s+/g, '_').toLowerCase();
          await prisma.arquivos.update({
            where: { id: arquivoId },
            data: { img_key, tipo: tipoImg },
          });
        } else {
          // Cria novo registro em arquivos e atualiza o item
          const tipoImg = (nome || item.nome).replace(/\s+/g, '_').toLowerCase();
          const arquivo = await prisma.arquivos.create({
            data: { img_key, tipo: tipoImg },
          });
          arquivoId = arquivo.id;
        }
      }
      const updatedItem = await prisma.itens.update({
        where: { id },
        data: {
          nome: nome || item.nome,
          descricao: descricao || item.descricao,
          preco: preco !== undefined ? preco : item.preco,
          subCategoriaId: subCategoriaId || item.subCategoriaId,
          imagemId: arquivoId ?? null,
        },
      });
      return { message: 'Item atualizado com sucesso', updatedItem };
    });
    return result;
  }
}

export { EditarItensService };
