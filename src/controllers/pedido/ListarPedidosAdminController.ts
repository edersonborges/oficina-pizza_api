import { Request, Response } from 'express';
import { ListarPedidosAdminService } from '../../services/pedido/ListarPedidosAdminService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarPedidosAdminController {
  private listarPedidosAdminService: ListarPedidosAdminService;

  constructor(listarPedidosAdminService: ListarPedidosAdminService) {
    this.listarPedidosAdminService = listarPedidosAdminService;
  }

  async handle(req: Request, res: Response) {
    try {
      const pedidos = await this.listarPedidosAdminService.execute();
      return res.json({ success: true, pedidos: serializeBigInt(pedidos) });
    } catch (error) {
      console.error('Erro ao listar pedidos (admin):', error);
      return res.status(500).json({ error: 'Não foi possível listar os pedidos' });
    }
  }
}

export { ListarPedidosAdminController };
