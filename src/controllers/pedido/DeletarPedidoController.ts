import { Request, Response } from 'express';
import { DeletarPedidoService } from '../../services/pedido/DeletarPedidoService';

class DeletarPedidoController {
  private deletarPedidoService: DeletarPedidoService;

  constructor(deletarPedidoService: DeletarPedidoService) {
    this.deletarPedidoService = deletarPedidoService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params; // ID do pedido
    try {
      const pedidoDeletado = await this.deletarPedidoService.execute(id);
      return res.json({ success: true, pedido: pedidoDeletado });
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      return res.status(500).json({ error: 'Não foi possível deletar o pedido' });
    }
  }
}

export { DeletarPedidoController };
