import { Request, Response } from 'express';
import { CriarCupomService } from '../../services/cupom_desconto/CriarCupomService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarCupomController {
  private criarCupomService: CriarCupomService;

  constructor(criarCupomService: CriarCupomService) {
    this.criarCupomService = criarCupomService;
  }

  async handle(req: Request, res: Response) {
    const { nome, dataInicio, dataFim, descricao, valor, tipoDesc, qntdDisponivel } = req.body;
    try {
      const cupom = await this.criarCupomService.execute({ nome, dataInicio, dataFim, descricao, valor, tipoDesc, qntdDisponivel });
      return res.json({ success: true, cupom: serializeBigInt(cupom) });
    } catch (error) {
      console.error('Error in CriarCupomController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CriarCupomController };
