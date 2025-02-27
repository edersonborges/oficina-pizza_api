import prismaClient from '../../prisma';

interface EditarPausaProgramadaDTO {
  id: string;
  dataInicio?: string; // ISO string (UTC)
  dataFim?: string;    // ISO string (UTC)
  descricao?: string;
}

const convertUTCtoLocal = (utcString: string): Date => {
  const date = new Date(utcString);
  // Opcional: ajuste se necessário:
  // date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
};

class EditarPausaProgramadaService {
  async execute(data: EditarPausaProgramadaDTO) {
    const { id, dataInicio, dataFim, descricao } = data;
    const updateData: any = {};

    if (dataInicio) {
      updateData.dataInicio = convertUTCtoLocal(dataInicio);
    }
    if (dataFim) {
      updateData.dataFim = convertUTCtoLocal(dataFim);
    }
    if (descricao !== undefined) {
      updateData.descricao = descricao;
    }

    const pausaAtualizada = await prismaClient.pausaServico.update({
      where: { id },
      data: updateData,
    });
    return pausaAtualizada;
  }
}

export { EditarPausaProgramadaService };
