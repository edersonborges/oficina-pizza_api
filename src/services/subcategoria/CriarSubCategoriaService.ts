import prismaClient from '../../prisma';

interface CriarSubCategoriaDTO {
  nome: string;
  ativo?: boolean;
  categoriaId: string;
}

class CriarSubCategoriaService {
  async execute({ nome, ativo = true, categoriaId }: CriarSubCategoriaDTO) {
    const novaSubCategoria = await prismaClient.subCategoria.create({
      data: {
        nome,
        ativo,
        categoriaId,
      },
    });
    return novaSubCategoria;
  }
}

export { CriarSubCategoriaService };
