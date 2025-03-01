import { Request, Response } from 'express';
import { ListarEnderecosUserService } from '../../services/endereco/ListarEnderecosUserService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarEnderecosUserController {
  private listarEnderecosUserService: ListarEnderecosUserService;

  constructor(listarEnderecosUserService: ListarEnderecosUserService) {
    this.listarEnderecosUserService = listarEnderecosUserService;
  }

  async handle(req: Request, res: Response) {
    try {
      // Supondo que o userId venha do token/middleware
      const usuarioId = req.user_id; 
      if (!usuarioId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const enderecos = await this.listarEnderecosUserService.execute(usuarioId);
      return res.json({ success: true, enderecos: serializeBigInt(enderecos) });
    } catch (error) {
      console.error('Erro ao listar endereços do usuário:', error);
      return res.status(500).json({ error: 'Erro interno ao listar endereços' });
    }
  }
}

export { ListarEnderecosUserController };
