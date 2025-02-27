import { Request, Response } from 'express';
import { EditarSaborService } from '../../services/cardapio/EditarSaborService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarSaborController {
  private editarSaborService: EditarSaborService;
  constructor(editarSaborService: EditarSaborService) {
    this.editarSaborService = editarSaborService;
  }
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao, valor, img_key } = req.body;
    try {
      const result = await this.editarSaborService.execute({ id, nome, descricao, valor, img_key });
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in EditarSaborController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarSaborController };
