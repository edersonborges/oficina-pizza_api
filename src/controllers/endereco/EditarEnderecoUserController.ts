import { Request, Response } from 'express';
import { EditarEnderecoUserService } from '../../services/endereco/EditarEnderecoUserService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarEnderecoUserController {
  private editarEnderecoUserService: EditarEnderecoUserService;

  constructor(editarEnderecoUserService: EditarEnderecoUserService) {
    this.editarEnderecoUserService = editarEnderecoUserService;
  }

  async handle(req: Request, res: Response) {
    try {
      // userId vem do token
      const usuarioId = req.user_id; 
      const { id } = req.params; // ID do endereço a editar
      const {
        rua,
        numero,
        bairro,
        cidade,
        cep,
        complemento,
        padrao,
        latitude,
        longitude,
      } = req.body;

      const enderecoAtualizado = await this.editarEnderecoUserService.execute({
        enderecoId: id,
        usuarioId,
        rua,
        numero,
        bairro,
        cidade,
        cep,
        complemento,
        padrao,
        latitude,
        longitude,
      });

      return res.json({ success: true, endereco: serializeBigInt(enderecoAtualizado) });
    } catch (error) {
      console.error('Erro ao editar endereço:', error);
      return res.status(500).json({ error: 'Não foi possível editar o endereço' });
    }
  }
}

export { EditarEnderecoUserController };
