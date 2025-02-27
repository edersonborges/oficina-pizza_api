import prismaClient from '../../prisma';

class ListarPromocaoService {
  async execute() {
    const promocoes = await prismaClient.promocao.findMany({
      where: {
        deletedAt: null, // Apenas promoções não deletadas
      },
      include: {
        itens: true, // Inclui os itens da promoção
      },
      orderBy: {
        createdAt: 'desc', // Ordena pela data de criação (mais recentes primeiro)
      },
    });
    return promocoes;
  }
}

export { ListarPromocaoService };
