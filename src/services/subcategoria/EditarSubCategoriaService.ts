import prismaClient from '../../prisma';

interface EditarSubCategoriaDTO {
  id: string;
  nome?: string;
  ativo?: boolean;
}

class EditarSubCategoriaService {
  async execute({ id, nome, ativo }: EditarSubCategoriaDTO) {
    const subCategoria = await prismaClient.subCategoria.findUnique({ where: { id } });
    if (!subCategoria) {
      throw new Error('Subcategoria não encontrada');
    }
    const updatedSubCategoria = await prismaClient.subCategoria.update({
      where: { id },
      data: {
        nome: nome || subCategoria.nome,
        ativo: ativo !== undefined ? ativo : subCategoria.ativo,
      },
    });
    return updatedSubCategoria;
  }
}

export { EditarSubCategoriaService };
