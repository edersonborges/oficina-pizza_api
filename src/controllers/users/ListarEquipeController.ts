import { Request, Response } from 'express';
import { ListarEquipeService } from '../../services/users/ListarEquipeService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarEquipeController {
  private listarEquipeService: ListarEquipeService;

  constructor(listarEquipeService: ListarEquipeService) {
    this.listarEquipeService = listarEquipeService;
  }

  async handle(req: Request, res: Response) {
    try {
      const equipe = await this.listarEquipeService.execute();
      return res.json({ success: true, equipe: serializeBigInt(equipe) });
    } catch (error) {
      console.error('Error in ListarEquipeController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarEquipeController };
