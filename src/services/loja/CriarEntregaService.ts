import prismaClient from '../../prisma';

interface CriarEntregaDTO {
  tipo: string;
  tempo: string;
  taxa: number;
  ativo?: boolean;
}

class CriarEntregaService {
  async execute({ tipo, tempo, taxa, ativo }: CriarEntregaDTO) {
    const entrega = await prismaClient.entrega.create({
      data: {
        tipo,
        tempo,
        taxa,
        ativo: ativo !== undefined ? ativo : true,
      },
    });
    return entrega;
  }
}

export { CriarEntregaService };
