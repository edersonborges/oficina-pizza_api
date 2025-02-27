import prismaClient from '../../prisma';

interface CriarAvaliacaoDTO {
  nota: number;
  comentario: string;
  pedidoId: string;
  dataAvaliacao?: string; // ISO string; se fornecido, será convertido para Date
}

class CriarAvaliacaoService {
  async execute({ nota, comentario, pedidoId, dataAvaliacao }: CriarAvaliacaoDTO) {
    const avaliacao = await prismaClient.avaliacoes.create({
      data: {
        nota,
        comentario,
        pedidoId,
        dataAvaliacao: dataAvaliacao ? new Date(dataAvaliacao) : undefined,
      },
    });
    return avaliacao;
  }
}

export { CriarAvaliacaoService };
