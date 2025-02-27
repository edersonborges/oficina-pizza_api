import { Request, Response } from 'express';
import { EditarPromoService } from '../../services/promocao/EditarPromoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarPromoController {
  private editarPromoService: EditarPromoService;

  constructor(editarPromoService: EditarPromoService) {
    this.editarPromoService = editarPromoService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao, valorPromocao, dataInicio, dataFim } = req.body;
    try {
      const result = await this.editarPromoService.execute({
        id,
        nome,
        descricao,
        valorPromocao,
        dataInicio,
        dataFim,
      });
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in EditarPromoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarPromoController };
