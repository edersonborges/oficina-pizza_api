import { Request, Response } from 'express';
import { EditarAdicionalService } from '../../services/cardapio/EditarAdicionalService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarAdicionalController {
  private editarAdicionalService: EditarAdicionalService;
  constructor(editarAdicionalService: EditarAdicionalService) {
    this.editarAdicionalService = editarAdicionalService;
  }
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, valor, qntd_min, qntd_max } = req.body;
    try {
      const result = await this.editarAdicionalService.execute({ id, nome, valor, qntd_min, qntd_max });
      return res.json({ success: true, message: serializeBigInt(result) });
    } catch (error) {
      console.error('Error in EditarAdicionalController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarAdicionalController };
