import prismaClient from '../../prisma';

interface CriarMassaDTO {
  itemId: string;
  nome: string;
  descricao: string;
  valor: number;
  img_key?: string;
}

class CriarMassaService {
  async execute({ itemId, nome, descricao, valor, img_key }: CriarMassaDTO) {
    let arquivoId: string | undefined;
    if (img_key) {
      const tipoImg = nome.replace(/\s+/g, '_').toLowerCase();
      const arquivo = await prismaClient.arquivos.create({
        data: { img_key, tipo: tipoImg },
      });
      arquivoId = arquivo.id;
    }
    const massa = await prismaClient.massas.create({
      data: {
        itemId,
        nome,
        descricao,
        valor,
        imagemId: arquivoId ?? null,
        ativo: true,
      },
    });
    return { message: 'Massa criada com sucesso', massa };
  }
}

export { CriarMassaService };
