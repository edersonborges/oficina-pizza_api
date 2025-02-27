import prismaClient from '../../prisma';

interface EditarCupomDTO {
  id: string;
  nome?: string;
  dataInicio?: string;
  dataFim?: string;
  descricao?: string;
  valor?: number;
  tipoDesc?: string;
  qntdDisponivel?: number;
}

class EditarCupomService {
  async execute({ id, nome, dataInicio, dataFim, descricao, valor, tipoDesc, qntdDisponivel }: EditarCupomDTO) {
    const cupom = await prismaClient.cupom_desconto.findUnique({ where: { id } });
    if (!cupom) {
      throw new Error('Cupom não encontrado');
    }
    const updatedCupom = await prismaClient.cupom_desconto.update({
      where: { id },
      data: {
        nome: nome ?? cupom.nome,
        dataInicio: dataInicio ? new Date(dataInicio) : cupom.dataInicio,
        dataFim: dataFim ? new Date(dataFim) : cupom.dataFim,
        descricao: descricao ?? cupom.descricao,
        valor: valor !== undefined ? valor : cupom.valor,
        tipoDesc: tipoDesc ?? cupom.tipoDesc,
        qntdDisponivel: qntdDisponivel !== undefined ? qntdDisponivel : cupom.qntdDisponivel,
      },
    });
    return updatedCupom;
  }
}

export { EditarCupomService };
