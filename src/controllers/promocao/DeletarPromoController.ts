import { Request, Response } from 'express';
import { DeletarPromoService } from '../../services/promocao/DeletarPromoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class DeletarPromoController {
  private deletarPromoService: DeletarPromoService;

  constructor(deletarPromoService: DeletarPromoService) {
    this.deletarPromoService = deletarPromoService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this.deletarPromoService.execute(id);
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in DeletarPromoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DeletarPromoController };
