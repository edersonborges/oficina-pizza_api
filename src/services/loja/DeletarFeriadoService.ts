import prismaClient from '../../prisma';

class DeletarFeriadoService {
  async execute(id: string) {
    const feriado = await prismaClient.feriado.findUnique({ where: { id } });
    if (!feriado) {
      throw new Error('Feriado não encontrado');
    }
    // Se desejar soft delete, seria necessário ter um campo deletedAt; caso contrário, utiliza exclusão física:
    const feriadoDeletado = await prismaClient.feriado.delete({
      where: { id },
    });
    return feriadoDeletado;
  }
}

export { DeletarFeriadoService };
