import { Request, Response } from 'express';
import { EditarPausaProgramadaService } from '../../services/loja/EditarPausaProgramadaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarPausaProgramadaController {
  private editarPausaProgramadaService: EditarPausaProgramadaService;

  constructor(editarPausaProgramadaService: EditarPausaProgramadaService) {
    this.editarPausaProgramadaService = editarPausaProgramadaService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { dataInicio, dataFim, descricao } = req.body;
    try {
      const pausaAtualizada = await this.editarPausaProgramadaService.execute({
        id,
        dataInicio,
        dataFim,
        descricao,
      });
      return res.json({ success: true, pausa: serializeBigInt(pausaAtualizada) });
    } catch (error) {
      console.error("Error in EditarPausaProgramadaController:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { EditarPausaProgramadaController };
