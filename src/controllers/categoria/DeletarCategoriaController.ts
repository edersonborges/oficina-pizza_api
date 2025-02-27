import { Request, Response } from 'express';
import { DeletarCategoriaService } from '../../services/categoria/DeletarCategoriaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class DeletarCategoriaController {
  private deletarCategoriaService: DeletarCategoriaService;

  constructor(deletarCategoriaService: DeletarCategoriaService) {
    this.deletarCategoriaService = deletarCategoriaService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const result = await this.deletarCategoriaService.execute(id);

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      const message = serializeBigInt(result);
      return res.json({ success: true, message });

    } catch (error) {
      console.error('Error in DeletarCategoriaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DeletarCategoriaController };
