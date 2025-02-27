import prismaClient from '../../prisma';

class ListarCupomService {
  async execute() {
    const cupons = await prismaClient.cupom_desconto.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return cupons;
  }
}

export { ListarCupomService };
