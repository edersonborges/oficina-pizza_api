import { Request, Response } from 'express';
import { CriarFeriadoService } from '../../services/loja/CriarFeriadoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarFeriadoController {
  private criarFeriadoService: CriarFeriadoService;

  constructor(criarFeriadoService: CriarFeriadoService) {
    this.criarFeriadoService = criarFeriadoService;
  }

  async handle(req: Request, res: Response) {
    const { lojaId, data, horaAbertura, horaFechamento, aberto, descricao } = req.body;
    try {
      const feriado = await this.criarFeriadoService.execute({
        lojaId,
        data,
        horaAbertura,
        horaFechamento,
        aberto,
        descricao,
      });
      return res.json({ success: true, feriado: serializeBigInt(feriado) });
    } catch (error) {
      console.error('Error in CriarFeriadoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CriarFeriadoController };
