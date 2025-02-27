import prismaClient from '../../prisma';

class DeletarEntregaService {
  async execute(id: string) {
    const entrega = await prismaClient.entrega.findUnique({ where: { id } });
    if (!entrega) {
      throw new Error("Entrega não encontrada");
    }
    const entregaDeletada = await prismaClient.entrega.delete({
      where: { id },
    });
    return entregaDeletada;
  }
}

export { DeletarEntregaService };
