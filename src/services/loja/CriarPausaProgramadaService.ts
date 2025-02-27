import prismaClient from '../../prisma';

interface CriarPausaProgramadaDTO {
  lojaId: string;
  dataInicio: string; // ISO string (UTC)
  dataFim?: string;   // ISO string (UTC)
  descricao?: string;
}

// Função auxiliar para converter UTC para horário local (se necessário)
const convertUTCtoLocal = (utcString: string): Date => {
  const date = new Date(utcString);
  // Opcional: ajuste se desejar aplicar o offset
  // date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
};

class CriarPausaProgramadaService {
  async execute(data: CriarPausaProgramadaDTO) {
    const { lojaId, dataInicio, dataFim, descricao } = data;

    const localDataInicio = convertUTCtoLocal(dataInicio);
    const localDataFim = dataFim ? convertUTCtoLocal(dataFim) : null;

    const pausa = await prismaClient.pausaServico.create({
      data: {
        lojaId,
        dataInicio: localDataInicio,
        dataFim: localDataFim,
        descricao,
      },
    });
    return pausa;
  }
}

export { CriarPausaProgramadaService };
