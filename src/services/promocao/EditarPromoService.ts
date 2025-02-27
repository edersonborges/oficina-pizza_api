import prismaClient from '../../prisma';

interface EditarPromoDTO {
  id: string;
  nome?: string;
  descricao?: string;
  valorPromocao?: number;
  dataInicio?: string;
  dataFim?: string;
}

class EditarPromoService {
  async execute(data: EditarPromoDTO) {
    const { id, nome, descricao, valorPromocao, dataInicio, dataFim } = data;
    const promo = await prismaClient.promocao.findUnique({ where: { id } });
    if (!promo) {
      throw new Error('Promoção não encontrada');
    }
    const updatedPromo = await prismaClient.promocao.update({
      where: { id },
      data: {
        nome: nome || promo.nome,
        descricao: descricao || promo.descricao,
        valorPromocao: valorPromocao !== undefined ? valorPromocao : promo.valorPromocao,
        dataInicio: dataInicio ? new Date(dataInicio) : promo.dataInicio,
        dataFim: dataFim ? new Date(dataFim) : promo.dataFim,
      },
    });
    return { message: 'Promoção atualizada com sucesso', promocao: updatedPromo };
  }
}

export { EditarPromoService };
