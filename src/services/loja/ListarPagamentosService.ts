import prismaClient from '../../prisma';

interface ListarPagamentosDTO {
  dia?: string;       // Ex: "2023-03-26"
  dataInicio?: string; // Ex: "2023-03-01T00:00:00Z"
  dataFim?: string;    // Ex: "2023-03-31T23:59:59Z"
}

class ListarPagamentosService {
  async execute(filters: ListarPagamentosDTO) {
    const whereClause: any = {};

    if (filters.dia) {
      // Se o filtro "dia" for fornecido, cria o intervalo para o dia
      const diaDate = new Date(filters.dia);
      const startOfDay = new Date(diaDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(diaDate);
      endOfDay.setHours(23, 59, 59, 999);
      whereClause.dataPagamentos = { gte: startOfDay, lte: endOfDay };
    } else if (filters.dataInicio && filters.dataFim) {
      // Se for fornecido um período
      whereClause.dataPagamentos = {
        gte: new Date(filters.dataInicio),
        lte: new Date(filters.dataFim),
      };
    }
    
    const pagamentos = await prismaClient.pagamentos.findMany({
      where: whereClause,
      orderBy: {
        dataPagamentos: 'desc',
      },
    });

    return pagamentos;
  }
}

export { ListarPagamentosService };
