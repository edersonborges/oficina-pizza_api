import { Request, Response } from 'express';
import { CreateCategoriaService } from '../../services/categoria/CreateCategoriaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CreateCategoriaController {
  private createCategoriaService: CreateCategoriaService;

  constructor(createCategoriaService: CreateCategoriaService) {
    this.createCategoriaService = createCategoriaService;
  }

  async handle(req: Request, res: Response) {
    const { nome, tipo, ativo, subCategorias } = req.body;

    try {
      const result = await this.createCategoriaService.execute({
        nome,
        tipo,
        ativo,
        subCategorias,
      });

      if (typeof result === 'string') {
        // Se o service retornar string, tratamos como erro
        return res.status(400).json({ error: result });
      }

      // Se vier no estilo { message: ... }
      const message = serializeBigInt(result);
      return res.json({ success: true, message });

    } catch (error) {
      console.error('Error in CreateCategoriaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CreateCategoriaController };
