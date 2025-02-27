import prismaClient from '../../prisma';

class DeletarItensService {
  async execute(itemId: string) {
    const now = new Date();
    // Recupera o item
    const item = await prismaClient.itens.findUnique({
      where: { id: itemId },
    });
    if (!item) {
      throw new Error('Item não encontrado');
    }
    // Soft delete do item
    await prismaClient.itens.update({
      where: { id: itemId },
      data: { deletedAt: now },
    });
    // Se o item for do tipo PIZZA, deletar também os registros relacionados
    if (item.tipoProduto === 'PIZZA') {
      await prismaClient.sabores.updateMany({
        where: { itemId },
        data: { deletedAt: now },
      });
      await prismaClient.massas.updateMany({
        where: { itemId },
        data: { deletedAt: now },
      });
      await prismaClient.adicionais.updateMany({
        where: { itemId },
        data: { deletedAt: now },
      });
      await prismaClient.tamanhos.updateMany({
        where: { itemId },
        data: { deletedAt: now },
      });
    }
    return { message: 'Item deletado com sucesso (soft delete)' };
  }
}

export { DeletarItensService };
