import prismaClient from '../../prisma';

class ListarAvaliacoesService {
  async execute() {
    const avaliacoes = await prismaClient.avaliacoes.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return avaliacoes;
  }
}

export { ListarAvaliacoesService };
