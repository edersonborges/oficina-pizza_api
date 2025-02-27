import prismaClient from '../../prisma';

interface EditarSaborDTO {
  id: string;
  nome?: string;
  descricao?: string;
  valor?: number;
  img_key?: string;
}

class EditarSaborService {
  async execute({ id, nome, descricao, valor, img_key }: EditarSaborDTO) {
    const result = await prismaClient.$transaction(async (prisma) => {
      const sabor = await prisma.sabores.findUnique({ where: { id } });
      if (!sabor) {
        throw new Error('Sabor não encontrado');
      }
      let arquivoId = sabor.imagemId;
      if (img_key) {
        if (arquivoId) {
          const tipoImg = (nome || sabor.nome).replace(/\s+/g, '_').toLowerCase();
          await prisma.arquivos.update({
            where: { id: arquivoId },
            data: { img_key, tipo: tipoImg },
          });
        } else {
          const tipoImg = (nome || sabor.nome).replace(/\s+/g, '_').toLowerCase();
          const arquivo = await prisma.arquivos.create({
            data: { img_key, tipo: tipoImg },
          });
          arquivoId = arquivo.id;
        }
      }
      const updatedSabor = await prisma.sabores.update({
        where: { id },
        data: {
          nome: nome || sabor.nome,
          descricao: descricao || sabor.descricao,
          valor: valor !== undefined ? valor : sabor.valor,
          imagemId: arquivoId ?? sabor.imagemId,
        },
      });
      return { message: 'Sabor atualizado com sucesso', updatedSabor };
    });
    return result;
  }
}

export { EditarSaborService };
