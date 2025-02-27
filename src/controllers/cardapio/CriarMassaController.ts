import { Request, Response } from 'express';
import { CriarMassaService } from '../../services/cardapio/CriarMassaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarMassaController {
  private criarMassaService: CriarMassaService;
  constructor(criarMassaService: CriarMassaService) {
    this.criarMassaService = criarMassaService;
  }
  async handle(req: Request, res: Response) {
    const { itemId, nome, descricao, valor, img_key } = req.body;
    try {
      const result = await this.criarMassaService.execute({ itemId, nome, descricao, valor, img_key });
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in CriarMassaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CriarMassaController };
