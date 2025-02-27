import { Request, Response } from 'express';
import { EditarEntregaService } from '../../services/loja/EditarEntregaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarEntregaController {
  private editarEntregaService: EditarEntregaService;

  constructor(editarEntregaService: EditarEntregaService) {
    this.editarEntregaService = editarEntregaService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { tipo, tempo, taxa, ativo } = req.body;
    try {
      const entregaAtualizada = await this.editarEntregaService.execute({
        id,
        tipo,
        tempo,
        taxa,
        ativo,
      });
      return res.json({ success: true, entrega: serializeBigInt(entregaAtualizada) });
    } catch (error) {
      console.error('Error in EditarEntregaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarEntregaController };
