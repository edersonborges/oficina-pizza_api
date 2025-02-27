import { Request, Response } from 'express';
import { CriarAvaliacaoService } from '../../services/avaliacao/CriarAvaliacaoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarAvaliacaoController {
  private criarAvaliacaoService: CriarAvaliacaoService;

  constructor(criarAvaliacaoService: CriarAvaliacaoService) {
    this.criarAvaliacaoService = criarAvaliacaoService;
  }

  async handle(req: Request, res: Response) {
    const { nota, comentario, pedidoId, dataAvaliacao } = req.body;
    try {
      const avaliacao = await this.criarAvaliacaoService.execute({
        nota,
        comentario,
        pedidoId,
        dataAvaliacao,
      });
      return res.json({ success: true, avaliacao: serializeBigInt(avaliacao) });
    } catch (error) {
      console.error('Error in CriarAvaliacaoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CriarAvaliacaoController };
