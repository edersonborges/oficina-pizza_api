import { Request, Response } from 'express';
import { CriarPausaProgramadaService } from '../../services/loja/CriarPausaProgramadaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarPausaProgramadaController {
  private criarPausaProgramadaService: CriarPausaProgramadaService;

  constructor(criarPausaProgramadaService: CriarPausaProgramadaService) {
    this.criarPausaProgramadaService = criarPausaProgramadaService;
  }

  async handle(req: Request, res: Response) {
    const { lojaId, dataInicio, dataFim, descricao } = req.body;
    try {
      const pausa = await this.criarPausaProgramadaService.execute({ lojaId, dataInicio, dataFim, descricao });
      return res.json({ success: true, pausa: serializeBigInt(pausa) });
    } catch (error) {
      console.error("Error in CriarPausaProgramadaController:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { CriarPausaProgramadaController };
