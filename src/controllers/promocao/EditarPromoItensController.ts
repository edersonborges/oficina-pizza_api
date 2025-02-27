import { Request, Response } from 'express';
import { EditarPromoItensService } from '../../services/promocao/EditarPromoItensService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarPromoItensController {
  private editarPromoItensService: EditarPromoItensService;

  constructor(editarPromoItensService: EditarPromoItensService) {
    this.editarPromoItensService = editarPromoItensService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao, valor, img_key } = req.body;
    try {
      const result = await this.editarPromoItensService.execute({
        id,
        nome,
        descricao,
        valor,
        img_key,
      });
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in EditarPromoItensController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarPromoItensController };
