import { Request, Response } from 'express';
import { EditarMassaService } from '../../services/cardapio/EditarMassaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarMassaController {
  private editarMassaService: EditarMassaService;
  constructor(editarMassaService: EditarMassaService) {
    this.editarMassaService = editarMassaService;
  }
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao, valor, img_key } = req.body;
    try {
      const result = await this.editarMassaService.execute({ id, nome, descricao, valor, img_key });
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in EditarMassaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarMassaController };
