import { Request, Response } from 'express';
import { EditarPedidoService } from '../../services/pedido/EditarPedidoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarPedidoController {
  private editarPedidoService: EditarPedidoService;

  constructor(editarPedidoService: EditarPedidoService) {
    this.editarPedidoService = editarPedidoService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params; // ID do pedido
    const { status, tipoPedido, formaPagamentoId, cupomId, valorTotal } = req.body;

    try {
      const pedidoAtualizado = await this.editarPedidoService.execute({
        pedidoId: id,
        status,
        tipoPedido,
        formaPagamentoId,
        cupomId,
        valorTotal,
      });
      return res.json({ success: true, pedido: serializeBigInt(pedidoAtualizado) });
    } catch (error) {
      console.error('Erro ao editar pedido:', error);
      return res.status(500).json({ error: 'Não foi possível editar o pedido' });
    }
  }
}

export { EditarPedidoController };
