import { Request, Response } from 'express';
import { CriarSaborService } from '../../services/cardapio/CriarSaborService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarSaborController {
  private criarSaborService: CriarSaborService;
  constructor(criarSaborService: CriarSaborService) {
    this.criarSaborService = criarSaborService;
  }
  async handle(req: Request, res: Response) {
    const { itemId, nome, descricao, valor, img_key } = req.body;
    try {
      const result = await this.criarSaborService.execute({ itemId, nome, descricao, valor, img_key });
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in CriarSaborController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CriarSaborController };
