import { Request, Response } from 'express';
import { DeletarEnderecoUserService } from '../../services/endereco/DeletarEnderecoUserService';

class DeletarEnderecoUserController {
  private deletarEnderecoUserService: DeletarEnderecoUserService;

  constructor(deletarEnderecoUserService: DeletarEnderecoUserService) {
    this.deletarEnderecoUserService = deletarEnderecoUserService;
  }

  async handle(req: Request, res: Response) {
    try {
      const usuarioId = req.user_id; 
      const { id } = req.params; // ID do endereço a deletar

      const enderecoDeletado = await this.deletarEnderecoUserService.execute(id, usuarioId);
      return res.json({ success: true, endereco: enderecoDeletado });
    } catch (error) {
      console.error('Erro ao deletar endereço:', error);
      return res.status(500).json({ error: 'Não foi possível deletar o endereço' });
    }
  }
}

export { DeletarEnderecoUserController };
