import { Request, Response } from 'express';
import { ListarPromocaoService } from '../../services/promocao/ListarPromocaoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarPromocaoController {
  private listarPromocaoService: ListarPromocaoService;

  constructor(listarPromocaoService: ListarPromocaoService) {
    this.listarPromocaoService = listarPromocaoService;
  }

  async handle(req: Request, res: Response) {
    try {
      const promocoes = await this.listarPromocaoService.execute();
      return res.json({ success: true, promocoes: serializeBigInt(promocoes) });
    } catch (error) {
      console.error('Error in ListarPromocaoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarPromocaoController };
