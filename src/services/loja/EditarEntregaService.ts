import prismaClient from '../../prisma';

interface EditarEntregaDTO {
  id: string;
  tipo?: string;
  tempo?: string;
  taxa?: number;
  ativo?: boolean;
}

class EditarEntregaService {
  async execute({ id, tipo, tempo, taxa, ativo }: EditarEntregaDTO) {
    // Verifica se a entrega existe
    const entregaExistente = await prismaClient.entrega.findUnique({ where: { id } });
    if (!entregaExistente) {
      throw new Error("Entrega não encontrada");
    }
    const entregaAtualizada = await prismaClient.entrega.update({
      where: { id },
      data: {
        tipo: tipo ?? entregaExistente.tipo,
        tempo: tempo ?? entregaExistente.tempo,
        taxa: taxa !== undefined ? taxa : entregaExistente.taxa,
        ativo: ativo !== undefined ? ativo : entregaExistente.ativo,
      },
    });
    return entregaAtualizada;
  }
}

export { EditarEntregaService };
