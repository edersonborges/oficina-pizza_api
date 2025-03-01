import { Request, Response } from 'express';
import { ListarPedidosUserService } from '../../services/pedido/ListarPedidosUserService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarPedidosUserController {
  private listarPedidosUserService: ListarPedidosUserService;

  constructor(listarPedidosUserService: ListarPedidosUserService) {
    this.listarPedidosUserService = listarPedidosUserService;
  }

  async handle(req: Request, res: Response) {
    try {
      // Supondo que o ID do usuário está em req.userId
      const usuarioId = req.user_id;

      const pedidos = await this.listarPedidosUserService.execute(usuarioId);
      return res.json({ success: true, pedidos: serializeBigInt(pedidos) });
    } catch (error) {
      console.error('Erro ao listar pedidos do usuário:', error);
      return res.status(500).json({ error: 'Não foi possível listar os pedidos do usuário' });
    }
  }
}

export { ListarPedidosUserController };
