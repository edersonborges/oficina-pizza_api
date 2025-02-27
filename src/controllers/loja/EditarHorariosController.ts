import { Request, Response } from 'express';
import { EditarHorariosService } from '../../services/loja/EditarHorariosService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarHorariosController {
  private editarHorariosService: EditarHorariosService;

  constructor(editarHorariosService: EditarHorariosService) {
    this.editarHorariosService = editarHorariosService;
  }

  async handle(req: Request, res: Response) {
    // O body deve conter "lojaId" e um array "horarios" com os dados de cada dia
    const { lojaId, horarios } = req.body;
    try {
      const resultados = await this.editarHorariosService.execute({ lojaId, horarios });
      return res.json({ success: true, horarios: serializeBigInt(resultados) });
    } catch (error) {
      console.error('Error in EditarHorariosController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarHorariosController };
