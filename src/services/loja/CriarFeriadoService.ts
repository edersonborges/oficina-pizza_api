import prismaClient from '../../prisma';

interface CriarFeriadoDTO {
  lojaId: string;
  data: string; // ISO string para a data do feriado
  horaAbertura?: string; // ISO string
  horaFechamento?: string; // ISO string
  aberto?: boolean;
  descricao?: string;
}

const convertUTCtoLocal = (utcString: string): Date => {
  const date = new Date(utcString);
  // Se necessário, ajuste o offset para converter para o horário local
  // date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
};

class CriarFeriadoService {
  async execute(data: CriarFeriadoDTO) {
    const { lojaId, data: dataFeriado, horaAbertura, horaFechamento, aberto, descricao } = data;
    
    const feriado = await prismaClient.feriado.create({
      data: {
        lojaId,
        data: new Date(dataFeriado), // data do feriado
        horaAbertura: horaAbertura ? convertUTCtoLocal(horaAbertura) : null,
        horaFechamento: horaFechamento ? convertUTCtoLocal(horaFechamento) : null,
        aberto: aberto !== undefined ? aberto : true,
        descricao,
      },
    });
    return feriado;
  }
}

export { CriarFeriadoService };
