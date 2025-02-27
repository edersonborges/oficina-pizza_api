import { Request, Response } from 'express';
import { EditarFeriadoService } from '../../services/loja/EditarFeriadoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarFeriadoController {
  private editarFeriadoService: EditarFeriadoService;

  constructor(editarFeriadoService: EditarFeriadoService) {
    this.editarFeriadoService = editarFeriadoService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { data, horaAbertura, horaFechamento, aberto, descricao } = req.body;
    try {
      const feriadoAtualizado = await this.editarFeriadoService.execute({
        id,
        data,
        horaAbertura,
        horaFechamento,
        aberto,
        descricao,
      });
      return res.json({ success: true, feriado: serializeBigInt(feriadoAtualizado) });
    } catch (error) {
      console.error('Error in EditarFeriadoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarFeriadoController };
