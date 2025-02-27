import { Request, Response } from 'express';
import { EditarCategoriaService } from '../../services/categoria/EditarCategoriaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarCategoriaController {
  private editarCategoriaService: EditarCategoriaService;

  constructor(editarCategoriaService: EditarCategoriaService) {
    this.editarCategoriaService = editarCategoriaService;
  }

  async handle(req: Request, res: Response) {
    // Pegamos campos do body
    const { id, nome, tipo, ativo } = req.body;

    try {
      const result = await this.editarCategoriaService.execute({
        id,
        nome,
        tipo,
        ativo,
      });

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      const message = serializeBigInt(result);
      return res.json({ success: true, message });

    } catch (error) {
      console.error('Error in EditarCategoriaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarCategoriaController };
