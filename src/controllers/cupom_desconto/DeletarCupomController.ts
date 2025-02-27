import { Request, Response } from 'express';
import { DeletarCupomService } from '../../services/cupom_desconto/DeletarCupomService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class DeletarCupomController {
  private deletarCupomService: DeletarCupomService;

  constructor(deletarCupomService: DeletarCupomService) {
    this.deletarCupomService = deletarCupomService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedCupom = await this.deletarCupomService.execute(id);
      return res.json({ success: true, cupom: serializeBigInt(deletedCupom) });
    } catch (error) {
      console.error('Error in DeletarCupomController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DeletarCupomController };
