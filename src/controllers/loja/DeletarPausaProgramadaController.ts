import { Request, Response } from 'express';
import { DeletarPausaProgramadaService } from '../../services/loja/DeletarPausaProgramadaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class DeletarPausaProgramadaController {
  private deletarPausaProgramadaService: DeletarPausaProgramadaService;

  constructor(deletarPausaProgramadaService: DeletarPausaProgramadaService) {
    this.deletarPausaProgramadaService = deletarPausaProgramadaService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const pausaDeletada = await this.deletarPausaProgramadaService.execute(id);
      return res.json({ success: true, pausa: serializeBigInt(pausaDeletada) });
    } catch (error) {
      console.error("Error in DeletarPausaProgramadaController:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { DeletarPausaProgramadaController };
