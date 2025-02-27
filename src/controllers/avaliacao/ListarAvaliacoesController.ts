import { Request, Response } from 'express';
import { ListarAvaliacoesService } from '../../services/avaliacao/ListarAvaliacoesService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarAvaliacoesController {
  private listarAvaliacoesService: ListarAvaliacoesService;

  constructor(listarAvaliacoesService: ListarAvaliacoesService) {
    this.listarAvaliacoesService = listarAvaliacoesService;
  }

  async handle(req: Request, res: Response) {
    try {
      const avaliacoes = await this.listarAvaliacoesService.execute();
      return res.json({ success: true, avaliacoes: serializeBigInt(avaliacoes) });
    } catch (error) {
      console.error('Error in ListarAvaliacoesController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarAvaliacoesController };
