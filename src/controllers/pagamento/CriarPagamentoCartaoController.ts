import { Request, Response } from 'express';
import { CriarPagamentoCartaoService } from '../../services/pagamento/CriarPagamentoCartaoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarPagamentoCartaoController {
  private criarPagamentoCartaoService: CriarPagamentoCartaoService;

  constructor(criarPagamentoCartaoService: CriarPagamentoCartaoService) {
    this.criarPagamentoCartaoService = criarPagamentoCartaoService;
  }

  async handle(req: Request, res: Response) {
    const {
      valor_transacao,
      descricao,
      token,
      metodo_pagamento,
      parcelas,
      email_comprador,
      nome_cartao,
      visitanteId,
    } = req.body;

    try {
      const pagamento = await this.criarPagamentoCartaoService.execute({
        valor_transacao,
        descricao,
        token,
        metodo_pagamento,
        parcelas,
        email_comprador,
        nome_cartao,
        visitanteId,
      });
      return res.status(201).json({ success: true, pagamento: serializeBigInt(pagamento) });
    } catch (error) {
      console.error('Error in CriarPagamentoCartaoController:', error);
      return res.status(500).json({ error: 'Could not create card payment' });
    }
  }
}

export { CriarPagamentoCartaoController };
