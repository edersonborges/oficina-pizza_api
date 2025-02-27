import prismaClient from '../../prisma';

class ListarSubCategoriaService {
  async execute(categoriaId?: string) {
    const whereClause: any = { deletedAt: null };
    if (categoriaId) {
      whereClause.categoriaId = categoriaId;
    }
    const subCategorias = await prismaClient.subCategoria.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });
    return subCategorias;
  }
}

export { ListarSubCategoriaService };
