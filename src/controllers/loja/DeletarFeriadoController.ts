import { Request, Response } from 'express';
import { DeletarFeriadoService } from '../../services/loja/DeletarFeriadoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class DeletarFeriadoController {
  private deletarFeriadoService: DeletarFeriadoService;

  constructor(deletarFeriadoService: DeletarFeriadoService) {
    this.deletarFeriadoService = deletarFeriadoService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const feriadoDeletado = await this.deletarFeriadoService.execute(id);
      return res.json({ success: true, feriado: serializeBigInt(feriadoDeletado) });
    } catch (error) {
      console.error('Error in DeletarFeriadoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DeletarFeriadoController };
