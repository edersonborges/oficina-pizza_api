import { Request, Response } from 'express';
import { EditarItensService } from '../../services/cardapio/EditarItensService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarItensController {
  private editarItensService: EditarItensService;
  constructor(editarItensService: EditarItensService) {
    this.editarItensService = editarItensService;
  }
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao, preco, subCategoriaId, img_key } = req.body;
    try {
      const result = await this.editarItensService.execute({ id, nome, descricao, preco, subCategoriaId, img_key });
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in EditarItensController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarItensController };
