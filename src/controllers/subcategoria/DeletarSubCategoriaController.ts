import { Request, Response } from 'express';
import { DeletarSubCategoriaService } from '../../services/subcategoria/DeletarSubCategoriaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class DeletarSubCategoriaController {
  private deletarSubCategoriaService: DeletarSubCategoriaService;

  constructor(deletarSubCategoriaService: DeletarSubCategoriaService) {
    this.deletarSubCategoriaService = deletarSubCategoriaService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedSubCategoria = await this.deletarSubCategoriaService.execute(id);
      return res.json({ success: true, message: serializeBigInt(deletedSubCategoria) });
    } catch (error) {
      console.error('Error in DeletarSubCategoriaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DeletarSubCategoriaController };
