import prismaClient from '../../prisma';

class DeletarPausaProgramadaService {
  async execute(id: string) {
    // Se desejar usar soft delete, adicione um campo deletedAt no schema e atualize-o.
    // Caso contrário, vamos realizar a exclusão física:
    const pausa = await prismaClient.pausaServico.findUnique({ where: { id } });
    if (!pausa) {
      throw new Error("Pausa programada não encontrada");
    }
    const pausaDeletada = await prismaClient.pausaServico.delete({
      where: { id },
    });
    return pausaDeletada;
  }
}

export { DeletarPausaProgramadaService };
