import prismaClient from '../../prisma';

interface ImagemDTO {
  img_key: string;
  tipo: string;
}

interface CriarLojaDTO {
  nome: string;
  descricao: string;
  pedidoMin: number;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  imagens?: ImagemDTO[];
}

class CriarLojaService {
  async execute(data: CriarLojaDTO) {
    const { nome, descricao, pedidoMin, cep, rua, numero, bairro, cidade, imagens } = data;

    const novaLoja = await prismaClient.$transaction(async (prisma) => {
      // Cria o registro da loja com os dados do endereço
      const loja = await prisma.loja.create({
        data: {
          nome,
          descricao,
          pedidoMin,
          cep,
          rua,
          numero,
          bairro,
          cidade,
        },
      });

      // Se imagens foram enviadas, cria registros em "arquivos" vinculados à loja
      if (imagens && imagens.length > 0) {
        for (const imagem of imagens) {
          await prisma.arquivos.create({
            data: {
              img_key: imagem.img_key,
              tipo: imagem.tipo,
              lojaId: loja.id,
            },
          });
        }
      }

      return loja;
    });

    return novaLoja;
  }
}

export { CriarLojaService };
