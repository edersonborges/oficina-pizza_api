import prismaClient from '../../prisma';

class ListarEntregaService {
  async execute() {
    const entregas = await prismaClient.entrega.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return entregas;
  }
}

export { ListarEntregaService };
