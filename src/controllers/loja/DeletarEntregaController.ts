import { Request, Response } from 'express';
import { DeletarEntregaService } from '../../services/loja/DeletarEntregaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class DeletarEntregaController {
  private deletarEntregaService: DeletarEntregaService;

  constructor(deletarEntregaService: DeletarEntregaService) {
    this.deletarEntregaService = deletarEntregaService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const entregaDeletada = await this.deletarEntregaService.execute(id);
      return res.json({ success: true, entrega: serializeBigInt(entregaDeletada) });
    } catch (error) {
      console.error('Error in DeletarEntregaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DeletarEntregaController };
