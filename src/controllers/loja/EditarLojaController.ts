import { Request, Response } from 'express';
import { EditarLojaService } from '../../services/loja/EditarLojaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class EditarLojaController {
  private editarLojaService: EditarLojaService;

  constructor(editarLojaService: EditarLojaService) {
    this.editarLojaService = editarLojaService;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao, pedidoMin, cep, rua, numero, bairro, cidade, imagens } = req.body;
    try {
      const lojaAtualizada = await this.editarLojaService.execute({
        id,
        nome,
        descricao,
        pedidoMin,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        imagens, // Ex.: [{ img_key: "img1-key", tipo: "logo" }, { img_key: "img2-key", tipo: "banner" }]
      });
      return res.json({ success: true, loja: serializeBigInt(lojaAtualizada) });
    } catch (error) {
      console.error("Error in EditarLojaController:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { EditarLojaController };
