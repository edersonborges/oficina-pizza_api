import prismaClient from '../../prisma';

interface EditarPromoItensDTO {
  id: string;
  nome?: string;
  descricao?: string;
  valor?: number;
  img_key?: string;
}

class EditarPromoItensService {
  async execute(data: EditarPromoItensDTO) {
    const { id, nome, descricao, valor, img_key } = data;
    const promoItem = await prismaClient.promocao_itens.findUnique({
      where: { id },
    });
    if (!promoItem) {
      throw new Error('Item da promoção não encontrado');
    }
    let finalImgKey = promoItem.img_key;
    if (img_key) {
      // Se nova imagem for enviada, atualiza o campo aplicando a transformação com base no nome
      const newName = nome || promoItem.nome;
      finalImgKey = newName.replace(/\s+/g, '_').toLowerCase();
    }
    const updatedPromoItem = await prismaClient.promocao_itens.update({
      where: { id },
      data: {
        nome: nome || promoItem.nome,
        descricao: descricao || promoItem.descricao,
        valor: valor !== undefined ? valor : promoItem.valor,
        img_key: finalImgKey,
      },
    });
    return { message: 'Item da promoção atualizado com sucesso', promoItem: updatedPromoItem };
  }
}

export { EditarPromoItensService };
