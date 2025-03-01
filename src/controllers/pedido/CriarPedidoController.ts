import { Request, Response } from 'express';
import { CriarPedidoService } from '../../services/pedido/CriarPedidoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CriarPedidoController {
  private criarPedidoService: CriarPedidoService;

  constructor(criarPedidoService: CriarPedidoService) {
    this.criarPedidoService = criarPedidoService;
  }

  async handle(req: Request, res: Response) {
    // usuarioId pode vir do token (req.userId) ou do body, dependendo da sua estratégia
    const usuarioId = req.user_id; // Exemplo se salva no token
    const { tipoPedido, formaPagamentoId, cupomId, itens } = req.body;

    try {
      const pedido = await this.criarPedidoService.execute({
        usuarioId,
        tipoPedido,
        formaPagamentoId,
        cupomId,
        itens,
      });
      return res.status(201).json({ success: true, pedido: serializeBigInt(pedido) });
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      return res.status(500).json({ error: 'Não foi possível criar o pedido' });
    }
  }
}

export { CriarPedidoController };
