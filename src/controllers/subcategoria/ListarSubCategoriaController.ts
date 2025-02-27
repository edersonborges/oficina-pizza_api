import { Request, Response } from 'express';
import { ListarSubCategoriaService } from '../../services/subcategoria/ListarSubCategoriaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarSubCategoriaController {
  private listarSubCategoriaService: ListarSubCategoriaService;

  constructor(listarSubCategoriaService: ListarSubCategoriaService) {
    this.listarSubCategoriaService = listarSubCategoriaService;
  }

  async handle(req: Request, res: Response) {
    const { categoriaId } = req.query;
    try {
      const subCategorias = await this.listarSubCategoriaService.execute(
        typeof categoriaId === 'string' ? categoriaId : undefined
      );
      return res.json({ success: true, message: serializeBigInt(subCategorias) });
    } catch (error) {
      console.error('Error in ListarSubCategoriaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarSubCategoriaController };
