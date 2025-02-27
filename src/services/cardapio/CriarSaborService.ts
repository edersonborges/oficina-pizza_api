import prismaClient from '../../prisma';

interface CriarSaborDTO {
  itemId: string;
  nome: string;
  descricao: string;
  valor: number;
  img_key?: string;
}

class CriarSaborService {
  async execute({ itemId, nome, descricao, valor, img_key }: CriarSaborDTO) {
    let arquivoId: string | undefined;
    if (img_key) {
      const tipoImg = nome.replace(/\s+/g, '_').toLowerCase();
      const arquivo = await prismaClient.arquivos.create({
        data: { img_key, tipo: tipoImg },
      });
      arquivoId = arquivo.id;
    }
    const sabor = await prismaClient.sabores.create({
      data: {
        itemId,
        nome,
        descricao,
        valor,
        imagemId: arquivoId ?? null,
        ativo: true,
      },
    });
    return { message: 'Sabor criado com sucesso', sabor };
  }
}

export { CriarSaborService };
