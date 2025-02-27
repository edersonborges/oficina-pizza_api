import { Request, Response } from 'express';
import { ListarCupomService } from '../../services/cupom_desconto/ListarCupomService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarCupomController {
  private listarCupomService: ListarCupomService;

  constructor(listarCupomService: ListarCupomService) {
    this.listarCupomService = listarCupomService;
  }

  async handle(req: Request, res: Response) {
    try {
      const cupons = await this.listarCupomService.execute();
      return res.json({ success: true, cupons: serializeBigInt(cupons) });
    } catch (error) {
      console.error('Error in ListarCupomController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarCupomController };
