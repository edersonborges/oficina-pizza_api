import prismaClient from '../../prisma';

class DuplicarSubcategoriaService {
  async execute(subCategoriaId: string) {
    // Busca a subcategoria pelo ID informado
    const subCategoria = await prismaClient.subCategoria.findUnique({
      where: { id: subCategoriaId },
    });

    if (!subCategoria) {
      throw new Error('Subcategoria não encontrada');
    }

    // Cria nova subcategoria duplicando os dados existentes
    // e adicionando " Copia" ao final do nome
    const novaSubcategoria = await prismaClient.subCategoria.create({
      data: {
        nome: `${subCategoria.nome} Copia`,
        ativo: subCategoria.ativo,
        categoriaId: subCategoria.categoriaId,
        // Campos createdAt, updatedAt e id serão gerados automaticamente
      },
    });

    return novaSubcategoria;
  }
}

export { DuplicarSubcategoriaService };
