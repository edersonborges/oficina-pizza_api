import { Request, Response } from 'express';
import { CriarPromoService } from '../../services/promocao/CriarPromoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarPromoController {
  private criarPromoService: CriarPromoService;

  constructor(criarPromoService: CriarPromoService) {
    this.criarPromoService = criarPromoService;
  }

  async handle(req: Request, res: Response) {
    const { nome, descricao, valorPromocao, dataInicio, dataFim, itens } = req.body;
    try {
      const result = await this.criarPromoService.execute({
        nome,
        descricao,
        valorPromocao,
        dataInicio,
        dataFim,
        itens,
      });
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in CriarPromoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CriarPromoController };
