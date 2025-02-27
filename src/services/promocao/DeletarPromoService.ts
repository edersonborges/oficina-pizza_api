import prismaClient from '../../prisma';

class DeletarPromoService {
  async execute(id: string) {
    // Verifica se a promoção existe
    const promo = await prismaClient.promocao.findUnique({ where: { id } });
    if (!promo) {
      throw new Error('Promoção não encontrada');
    }
    // Executa a operação dentro de uma transação
    const deletedPromo = await prismaClient.$transaction(async (prisma) => {
      // Atualiza o campo deletedAt da promoção
      const promoDeleted = await prisma.promocao.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      // Atualiza o campo deletedAt de todos os itens da promoção
      await prisma.promocao_itens.updateMany({
        where: { promocaoId: id },
        data: { deletedAt: new Date() },
      });
      return promoDeleted;
    });
    return { message: 'Promoção e seus itens foram deletados com sucesso (soft delete)', promocao: deletedPromo };
  }
}

export { DeletarPromoService };
