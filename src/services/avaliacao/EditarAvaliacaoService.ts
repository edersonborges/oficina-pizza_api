import prismaClient from '../../prisma';

interface EditarAvaliacaoDTO {
  id: string;
  nota?: number;
  comentario?: string;
  dataAvaliacao?: string;
}

class EditarAvaliacaoService {
  async execute({ id, nota, comentario, dataAvaliacao }: EditarAvaliacaoDTO) {
    const avaliacao = await prismaClient.avaliacoes.findUnique({ where: { id } });
    if (!avaliacao) {
      throw new Error('Avaliação não encontrada');
    }
    const updatedAvaliacao = await prismaClient.avaliacoes.update({
      where: { id },
      data: {
        nota: nota !== undefined ? nota : avaliacao.nota,
        comentario: comentario || avaliacao.comentario,
        dataAvaliacao: dataAvaliacao ? new Date(dataAvaliacao) : avaliacao.dataAvaliacao,
      },
    });
    return updatedAvaliacao;
  }
}

export { EditarAvaliacaoService };
