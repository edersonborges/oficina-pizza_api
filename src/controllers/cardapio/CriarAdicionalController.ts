import { Request, Response } from 'express';
import { CriarAdicionalService } from '../../services/cardapio/CriarAdicionalService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarAdicionalController {
  private criarAdicionalService: CriarAdicionalService;
  constructor(criarAdicionalService: CriarAdicionalService) {
    this.criarAdicionalService = criarAdicionalService;
  }
  async handle(req: Request, res: Response) {
    const { itemId, nome, valor, qntd_min, qntd_max } = req.body;
    try {
      const result = await this.criarAdicionalService.execute({ itemId, nome, valor, qntd_min, qntd_max });
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in CriarAdicionalController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CriarAdicionalController };
