import { Request, Response } from 'express';
import { EditarCupomService } from '../../services/cupom_desconto/EditarCupomService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarCupomController {
  private editarCupomService: EditarCupomService;

  constructor(editarCupomService: EditarCupomService) {
    this.editarCupomService = editarCupomService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, dataInicio, dataFim, descricao, valor, tipoDesc, qntdDisponivel } = req.body;
    try {
      const updatedCupom = await this.editarCupomService.execute({
        id,
        nome,
        dataInicio,
        dataFim,
        descricao,
        valor,
        tipoDesc,
        qntdDisponivel,
      });
      return res.json({ success: true, cupom: serializeBigInt(updatedCupom) });
    } catch (error) {
      console.error('Error in EditarCupomController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EditarCupomController };
