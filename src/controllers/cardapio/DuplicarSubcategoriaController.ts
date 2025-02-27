import { Request, Response } from 'express';
import { DuplicarSubcategoriaService } from '../../services/cardapio/DuplicarSubcategoriaService';

class DuplicarSubcategoriaController {
  private duplicarSubcategoriaService: DuplicarSubcategoriaService;

  constructor(duplicarSubcategoriaService: DuplicarSubcategoriaService) {
    this.duplicarSubcategoriaService = duplicarSubcategoriaService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params; // ID da subcategoria a duplicar
    try {
      const novaSubcategoria = await this.duplicarSubcategoriaService.execute(id);
      return res.json({ success: true, message: novaSubcategoria });
    } catch (error) {
      console.error('Error in DuplicarSubcategoriaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DuplicarSubcategoriaController };
