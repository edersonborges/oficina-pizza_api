import { Request, Response } from 'express';
import { EditarAvaliacaoService } from '../../services/avaliacao/EditarAvaliacaoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarAvaliacaoController {
  private editarAvaliacaoService: EditarAvaliacaoService;

  constructor(editarAvaliacaoService: EditarAvaliacaoService) {
    this.editarAvaliacaoService = editarAvaliacaoService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nota, comentario, dataAvaliacao } = req.body;
    try {
      const updatedAvaliacao = await this.editarAvaliacaoService.execute({
        id,
        nota,
        comentario,
        dataAvaliacao,
      });
      return res.json({ success: true, avaliacao: serializeBigInt(updatedAvaliacao) });
    } catch (error) {
      console.error('Error in EditarAvaliacaoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarAvaliacaoController };
