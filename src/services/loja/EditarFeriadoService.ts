import prismaClient from '../../prisma';

interface EditarFeriadoDTO {
  id: string;
  data?: string;
  horaAbertura?: string;
  horaFechamento?: string;
  aberto?: boolean;
  descricao?: string;
}

const convertUTCtoLocal = (utcString: string): Date => {
  const date = new Date(utcString);
  // Se necessário, ajuste o offset
  return date;
};

class EditarFeriadoService {
  async execute(data: EditarFeriadoDTO) {
    const { id, data: novaData, horaAbertura, horaFechamento, aberto, descricao } = data;
    const updateData: any = {};

    if (novaData) {
      updateData.data = new Date(novaData);
    }
    if (horaAbertura) {
      updateData.horaAbertura = convertUTCtoLocal(horaAbertura);
    }
    if (horaFechamento) {
      updateData.horaFechamento = convertUTCtoLocal(horaFechamento);
    }
    if (aberto !== undefined) {
      updateData.aberto = aberto;
    }
    if (descricao !== undefined) {
      updateData.descricao = descricao;
    }

    const feriadoAtualizado = await prismaClient.feriado.update({
      where: { id },
      data: updateData,
    });
    return feriadoAtualizado;
  }
}

export { EditarFeriadoService };
