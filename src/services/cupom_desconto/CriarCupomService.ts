import prismaClient from '../../prisma';

interface CriarCupomDTO {
  nome: string;
  dataInicio: string; // ISO string
  dataFim: string;    // ISO string
  descricao: string;
  valor?: number;
  tipoDesc: string;
  qntdDisponivel: number;
}

class CriarCupomService {
  async execute({ nome, dataInicio, dataFim, descricao, valor, tipoDesc, qntdDisponivel }: CriarCupomDTO) {
    const cupom = await prismaClient.cupom_desconto.create({
      data: {
        nome,
        dataInicio: new Date(dataInicio),
        dataFim: new Date(dataFim),
        descricao,
        valor,
        tipoDesc,
        qntdDisponivel,
      },
    });
    return cupom;
  }
}

export { CriarCupomService };
