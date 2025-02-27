import { Request, Response } from 'express';
import { DeletarAvaliacaoService } from '../../services/avaliacao/DeletarAvaliacaoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class DeletarAvaliacaoController {
  private deletarAvaliacaoService: DeletarAvaliacaoService;

  constructor(deletarAvaliacaoService: DeletarAvaliacaoService) {
    this.deletarAvaliacaoService = deletarAvaliacaoService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedAvaliacao = await this.deletarAvaliacaoService.execute(id);
      return res.json({ success: true, avaliacao: serializeBigInt(deletedAvaliacao) });
    } catch (error) {
      console.error('Error in DeletarAvaliacaoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DeletarAvaliacaoController };
