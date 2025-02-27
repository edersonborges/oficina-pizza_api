import { Request, Response } from 'express';
import { CriarLojaService } from '../../services/loja/CriarLojaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarLojaController {
  private criarLojaService: CriarLojaService;

  constructor(criarLojaService: CriarLojaService) {
    this.criarLojaService = criarLojaService;
  }

  async handle(req: Request, res: Response) {
    const { nome, descricao, pedidoMin, cep, rua, numero, bairro, cidade, imagens } = req.body;
    try {
      const loja = await this.criarLojaService.execute({
        nome,
        descricao,
        pedidoMin,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        imagens, // Deve ser um array de objetos { img_key, tipo }
      });
      return res.json({ success: true, loja: serializeBigInt(loja) });
    } catch (error) {
      console.error('Error in CriarLojaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CriarLojaController };
