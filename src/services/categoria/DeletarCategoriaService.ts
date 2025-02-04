import prismaClient from '../../prisma';

class DeletarCategoriaService {
  async execute(id: string) {
    // Verifica se existe
    const categoria = await prismaClient.categoria.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!categoria) {
      return 'Categoria não encontrada ou já deletada.';
    }

    // Transação para soft-deletar a categoria e subcategorias
    await prismaClient.$transaction(async (prisma) => {
      // 1) Atualiza deletedAt da categoria
      await prisma.categoria.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      // 2) Atualiza deletedAt das subcategorias relacionadas
      await prisma.subCategoria.updateMany({
        where: { categoriaId: id, deletedAt: null },
        data: {
          deletedAt: new Date(),
        },
      });
    });

    return {
      message: 'Categoria e subcategorias deletadas com sucesso.',
    };
  }
}

export { DeletarCategoriaService };
