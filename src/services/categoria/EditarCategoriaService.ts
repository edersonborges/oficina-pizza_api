import prismaClient from '../../prisma';

interface EditarCategoriaDTO {
  id: string;         // id da categoria que vamos editar
  nome?: string;      // campos opcionais
  tipo?: string;
  ativo?: boolean;
}

class EditarCategoriaService {
  async execute({ id, nome, tipo, ativo }: EditarCategoriaDTO) {
    // Verifica se existe
    const categoria = await prismaClient.categoria.findFirst({
      where: { id, deletedAt: null },
    });

    if (!categoria) {
      return 'Categoria não encontrada ou já deletada.';
    }

    // Transação para editar
    const categoriaEditada = await prismaClient.$transaction(async (prisma) => {
      const updated = await prisma.categoria.update({
        where: { id },
        data: {
          nome: nome ?? categoria.nome,
          tipo: tipo ?? categoria.tipo,
          ativo: ativo ?? categoria.ativo,
        },
      });
      return updated;
    });

    return {
      message: categoriaEditada,
    };
  }
}

export { EditarCategoriaService };
