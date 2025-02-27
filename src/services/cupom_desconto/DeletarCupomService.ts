import prismaClient from '../../prisma';

class DeletarCupomService {
  async execute(id: string) {
    const cupom = await prismaClient.cupom_desconto.findUnique({ where: { id } });
    if (!cupom) {
      throw new Error('Cupom não encontrado');
    }
    const deletedCupom = await prismaClient.cupom_desconto.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return deletedCupom;
  }
}

export { DeletarCupomService };
