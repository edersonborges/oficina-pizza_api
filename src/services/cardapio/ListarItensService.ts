import prismaClient from '../../prisma';

interface ListarItensDTO {
  tipoProduto?: string; // opcional – ex.: "PIZZA", "BEBIDA", "OUTRO"
}

class ListarItensService {
  async execute({ tipoProduto }: ListarItensDTO) {
    const whereClause: any = { deletedAt: null };
    if (tipoProduto) {
      whereClause.tipoProduto = tipoProduto.toUpperCase();
    }
    const itens = await prismaClient.itens.findMany({
      where: whereClause,
    });
    return itens;
  }
}

export { ListarItensService };
