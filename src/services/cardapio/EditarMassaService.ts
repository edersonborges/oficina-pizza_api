import prismaClient from '../../prisma';

interface EditarMassaDTO {
  id: string;
  nome?: string;
  descricao?: string;
  valor?: number;
  img_key?: string;
}

class EditarMassaService {
  async execute({ id, nome, descricao, valor, img_key }: EditarMassaDTO) {
    const result = await prismaClient.$transaction(async (prisma) => {
      const massa = await prisma.massas.findUnique({ where: { id } });
      if (!massa) {
        throw new Error('Massa não encontrada');
      }
      let arquivoId = massa.imagemId;
      if (img_key) {
        if (arquivoId) {
          const tipoImg = (nome || massa.nome).replace(/\s+/g, '_').toLowerCase();
          await prisma.arquivos.update({
            where: { id: arquivoId },
            data: { img_key, tipo: tipoImg },
          });
        } else {
          const tipoImg = (nome || massa.nome).replace(/\s+/g, '_').toLowerCase();
          const arquivo = await prisma.arquivos.create({
            data: { img_key, tipo: tipoImg },
          });
          arquivoId = arquivo.id;
        }
      }
      const updatedMassa = await prisma.massas.update({
        where: { id },
        data: {
          nome: nome || massa.nome,
          descricao: descricao || massa.descricao,
          valor: valor !== undefined ? valor : massa.valor,
          imagemId: arquivoId ?? massa.imagemId,
        },
      });
      return { message: 'Massa atualizada com sucesso', updatedMassa };
    });
    return result;
  }
}

export { EditarMassaService };
