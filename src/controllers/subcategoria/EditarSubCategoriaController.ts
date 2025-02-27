import { Request, Response } from 'express';
import { EditarSubCategoriaService } from '../../services/subcategoria/EditarSubCategoriaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarSubCategoriaController {
  private editarSubCategoriaService: EditarSubCategoriaService;

  constructor(editarSubCategoriaService: EditarSubCategoriaService) {
    this.editarSubCategoriaService = editarSubCategoriaService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, ativo } = req.body;
    try {
      const updatedSubCategoria = await this.editarSubCategoriaService.execute({ id, nome, ativo });
      return res.json({ success: true, message: serializeBigInt(updatedSubCategoria) });
    } catch (error) {
      console.error('Error in EditarSubCategoriaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarSubCategoriaController };
