import { Request, Response } from 'express';
import { ListarCategoriaService } from '../../services/categoria/ListarCategoriaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarCategoriaController {
  private listarCategoriaService: ListarCategoriaService;

  constructor(listarCategoriaService: ListarCategoriaService) {
    this.listarCategoriaService = listarCategoriaService;
  }

  async handle(req: Request, res: Response) {
    try {
      const result = await this.listarCategoriaService.execute();

      // No estilo anterior, se fosse string, seria erro;
      // Como aqui sempre retorna objeto, assumimos sucesso.
      const message = serializeBigInt(result);
      return res.json({ success: true, message });
    } catch (error) {
      console.error('Error in ListarCategoriaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarCategoriaController };
