import { Request, Response } from 'express';
import { DeletarItensService } from '../../services/cardapio/DeletarItensService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class DeletarItensController {
  private deletarItensService: DeletarItensService;
  constructor(deletarItensService: DeletarItensService) {
    this.deletarItensService = deletarItensService;
  }
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this.deletarItensService.execute(id);
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in DeletarItensController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DeletarItensController };
