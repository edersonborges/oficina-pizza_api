import { Request, Response } from 'express';
import { CriarEntregaService } from '../../services/loja/CriarEntregaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarEntregaController {
  private criarEntregaService: CriarEntregaService;

  constructor(criarEntregaService: CriarEntregaService) {
    this.criarEntregaService = criarEntregaService;
  }

  async handle(req: Request, res: Response) {
    const { tipo, tempo, taxa, ativo } = req.body;
    try {
      const entrega = await this.criarEntregaService.execute({ tipo, tempo, taxa, ativo });
      return res.json({ success: true, entrega: serializeBigInt(entrega) });
    } catch (error) {
      console.error('Error in CriarEntregaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CriarEntregaController };
