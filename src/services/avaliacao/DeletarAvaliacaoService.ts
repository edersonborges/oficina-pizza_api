import prismaClient from '../../prisma';

class DeletarAvaliacaoService {
  async execute(id: string) {
    const avaliacao = await prismaClient.avaliacoes.findUnique({ where: { id } });
    if (!avaliacao) {
      throw new Error('Avaliação não encontrada');
    }
    const deletedAvaliacao = await prismaClient.avaliacoes.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return deletedAvaliacao;
  }
}

export { DeletarAvaliacaoService };
