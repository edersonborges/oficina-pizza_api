import { Request, Response } from 'express';
import { CriarSubCategoriaService } from '../../services/subcategoria/CriarSubCategoriaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarSubCategoriaController {
  private criarSubCategoriaService: CriarSubCategoriaService;

  constructor(criarSubCategoriaService: CriarSubCategoriaService) {
    this.criarSubCategoriaService = criarSubCategoriaService;
  }

  async handle(req: Request, res: Response) {
    const { nome, ativo, categoriaId } = req.body;
    try {
      const subCategoria = await this.criarSubCategoriaService.execute({ nome, ativo, categoriaId });
      return res.json({ success: true, message: serializeBigInt(subCategoria) });
    } catch (error) {
      console.error('Error in CriarSubCategoriaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CriarSubCategoriaController };
