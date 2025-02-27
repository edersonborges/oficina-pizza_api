import { Request, Response } from 'express';
import { ListarPagamentosService } from '../../services/loja/ListarPagamentosService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarPagamentosController {
  private listarPagamentosService: ListarPagamentosService;

  constructor(listarPagamentosService: ListarPagamentosService) {
    this.listarPagamentosService = listarPagamentosService;
  }

  async handle(req: Request, res: Response) {
    // Recupera os filtros via query string (ex: /pagamentos/list?dia=2023-03-26)
    const { dia, dataInicio, dataFim } = req.query;
    try {
      const pagamentos = await this.listarPagamentosService.execute({
        dia: typeof dia === 'string' ? dia : undefined,
        dataInicio: typeof dataInicio === 'string' ? dataInicio : undefined,
        dataFim: typeof dataFim === 'string' ? dataFim : undefined,
      });
      return res.json({ success: true, pagamentos: serializeBigInt(pagamentos) });
    } catch (error) {
      console.error('Error in ListarPagamentosController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarPagamentosController };
