import prismaClient from '../../prisma';

interface SubCategoriaDTO {
  nome: string;
  ativo?: boolean;  // opcional
}

interface CreateCategoriaDTO {
  nome: string;
  tipo: string;
  ativo?: boolean;
  subCategorias: SubCategoriaDTO[];
}

class CreateCategoriaService {
  async execute({ nome, tipo, ativo, subCategorias }: CreateCategoriaDTO) {
    if (!nome) {
      throw new Error('Nome da categoria é obrigatório.');
    }

    const result = await prismaClient.$transaction(async (prisma) => {
      const categoria = await prisma.categoria.create({
        data: {
          nome: nome,
          tipo: tipo,         
          ativo: ativo ?? false,
        },
      });

      if (subCategorias && subCategorias.length > 0) {
        for (const sub of subCategorias) {
          await prisma.subCategoria.create({
            data: {
              nome: sub.nome,
              ativo: sub.ativo ?? false,
              categoriaId: categoria.id,
            },
          });
        }
      }
      return categoria;
    });

    return result;
  }
}

export { CreateCategoriaService };
