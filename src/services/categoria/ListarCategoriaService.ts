import prismaClient from '../../prisma';

class ListarCategoriaService {
  async execute() {
    // Busca todas as categorias que não foram deletadas
    // E inclui subCategorias que também não foram deletadas (opcionalmente filtradas)
    const categorias = await prismaClient.categoria.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        subCategoria: {
          where: { deletedAt: null }, // para não listar subcategorias deletadas
        },
      },
      orderBy: {
        createdAt: 'desc', // se quiser ordenar por data, por exemplo
      },
    });

    return {
      message: categorias,
    };
  }
}

export { ListarCategoriaService };
