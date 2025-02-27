import prismaClient from '../../prisma';

interface CriarPromoDTO {
  nome: string;
  descricao: string;
  valorPromocao: number;
  dataInicio: string; // em ISO string (UTC)
  dataFim: string;    // em ISO string (UTC)
  itens: {
    nome: string;
    descricao: string;
    valor: number;
    img_key?: string;
  }[];
}

class CriarPromoService {
  async execute(data: CriarPromoDTO) {
    const { nome, descricao, valorPromocao, dataInicio, dataFim, itens } = data;
    const result = await prismaClient.$transaction(async (prisma) => {
      // Cria a promoção principal
      const novaPromo = await prisma.promocao.create({
        data: {
          nome,
          descricao,
          valorPromocao,
          dataInicio: new Date(dataInicio),
          dataFim: new Date(dataFim),
        },
      });
      // Cria os itens da promoção vinculados à promoção criada
      for (const item of itens) {
        let finalImgKey: string | null = null;
        if (item.img_key) {
          // Exemplo de transformação: usar o nome do item (com espaços substituídos por "_" e minúsculo)
          finalImgKey = item.nome.replace(/\s+/g, '_').toLowerCase();
        }
        await prisma.promocao_itens.create({
          data: {
            nome: item.nome,
            descricao: item.descricao,
            valor: item.valor,
            img_key: finalImgKey,
            promocaoId: novaPromo.id,
          },
        });
      }
      return novaPromo;
    });
    return { message: 'Promoção criada com sucesso', promocao: result };
  }
}

export { CriarPromoService };
