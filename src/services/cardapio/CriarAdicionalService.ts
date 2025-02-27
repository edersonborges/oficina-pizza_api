import prismaClient from '../../prisma';

interface CriarAdicionalDTO {
  itemId: string;
  nome: string;
  valor: number;
  qntd_min: number;
  qntd_max: number;
}

class CriarAdicionalService {
  async execute({ itemId, nome, valor, qntd_min, qntd_max }: CriarAdicionalDTO) {
    const adicional = await prismaClient.adicionais.create({
      data: {
        itemId,
        nome,
        valor,
        qntd_min,
        qntd_max,
        ativo: true,
      },
    });
    return { message: 'Adicional criado com sucesso', adicional };
  }
}

export { CriarAdicionalService };
