import { Request, Response } from 'express';
import { ListarItensService } from '../../services/cardapio/ListarItensService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarItensController {
  private listarItensService: ListarItensService;
  constructor(listarItensService: ListarItensService) {
    this.listarItensService = listarItensService;
  }

  async handle(req: Request, res: Response) {
    const { tipoProduto } = req.query;
    try {
      const itens = await this.listarItensService.execute({
        tipoProduto: typeof tipoProduto === 'string' ? tipoProduto : undefined,
      });
      return res.json({ success: true, itens: serializeBigInt(itens) });
    } catch (error) {
      console.error('Error in ListarItensController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarItensController };
