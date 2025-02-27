import prismaClient from '../../prisma';

class DeletarSubCategoriaService {
  async execute(id: string) {
    const subCategoria = await prismaClient.subCategoria.findUnique({ where: { id } });
    if (!subCategoria) {
      throw new Error('Subcategoria não encontrada');
    }
    // Soft delete: atualiza o campo deletedAt com a data atual
    const deletedSubCategoria = await prismaClient.subCategoria.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedSubCategoria;
  }
}

export { DeletarSubCategoriaService };
