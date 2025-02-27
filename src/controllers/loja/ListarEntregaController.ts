import { Request, Response } from 'express';
import { ListarEntregaService } from '../../services/loja/ListarEntregaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarEntregaController {
  private listarEntregaService: ListarEntregaService;

  constructor(listarEntregaService: ListarEntregaService) {
    this.listarEntregaService = listarEntregaService;
  }

  async handle(req: Request, res: Response) {
    try {
      const entregas = await this.listarEntregaService.execute();
      return res.json({ success: true, entregas: serializeBigInt(entregas) });
    } catch (error) {
      console.error('Error in ListarEntregaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarEntregaController };
