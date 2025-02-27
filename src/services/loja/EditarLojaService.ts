import prismaClient from '../../prisma';

interface ImagemDTO {
  img_key: string;
  tipo: string;
}

interface EditarLojaDTO {
  id: string;
  nome?: string;
  descricao?: string;
  pedidoMin?: number;
  cep?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  imagens?: ImagemDTO[]; // Array final de imagens para a loja
}

class EditarLojaService {
  async execute(data: EditarLojaDTO) {
    const { id, nome, descricao, pedidoMin, cep, rua, numero, bairro, cidade, imagens } = data;

    // Verifica se a loja existe
    const lojaExistente = await prismaClient.loja.findUnique({ where: { id } });
    if (!lojaExistente) {
      throw new Error("Loja não encontrada");
    }

    // Executa a operação em transação para garantir integridade
    const updatedLoja = await prismaClient.$transaction(async (prisma) => {
      // Atualiza os dados da loja
      const lojaAtualizada = await prisma.loja.update({
        where: { id },
        data: {
          nome: nome ?? lojaExistente.nome,
          descricao: descricao ?? lojaExistente.descricao,
          pedidoMin: pedidoMin ?? lojaExistente.pedidoMin,
          cep: cep ?? lojaExistente.cep,
          rua: rua ?? lojaExistente.rua,
          numero: numero ?? lojaExistente.numero,
          bairro: bairro ?? lojaExistente.bairro,
          cidade: cidade ?? lojaExistente.cidade,
        },
      });

      // Se o array de imagens foi fornecido, sincroniza os registros
      if (imagens) {
        // Busca as imagens existentes associadas à loja
        const imagensExistentes = await prisma.arquivos.findMany({
          where: { lojaId: id },
        });

        // Deleta as imagens que existem no banco, mas não estão no array recebido
        for (const imgExistente of imagensExistentes) {
          const found = imagens.find(
            (img) =>
              img.img_key === imgExistente.img_key && img.tipo === imgExistente.tipo
          );
          if (!found) {
            await prisma.arquivos.delete({ where: { id: imgExistente.id } });
          }
        }

        // Adiciona as novas imagens que estão no array, mas não existem no banco
        for (const img of imagens) {
          const exists = imagensExistentes.find(
            (imgExistente) =>
              imgExistente.img_key === img.img_key && imgExistente.tipo === img.tipo
          );
          if (!exists) {
            await prisma.arquivos.create({
              data: {
                img_key: img.img_key,
                tipo: img.tipo,
                lojaId: id,
              },
            });
          }
        }
      }

      return lojaAtualizada;
    });

    return updatedLoja;
  }
}

export { EditarLojaService };
