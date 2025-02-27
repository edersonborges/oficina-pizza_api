import { Request, Response } from 'express';
import { CadastrarItemService } from '../../services/cardapio/CadastrarItemService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CadastrarItemController {
  private cadastrarItemService: CadastrarItemService;

  constructor(cadastrarItemService: CadastrarItemService) {
    this.cadastrarItemService = cadastrarItemService;
  }

  async handle(req: Request, res: Response) {
    const { nome, descricao, preco, subCategoriaId, img_key, tipoProduto } = req.body;

    try {
      const result = await this.cadastrarItemService.execute({
        nome,
        descricao,
        preco,
        subCategoriaId,
        img_key,
        tipoProduto,
      });

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      const message = serializeBigInt(result);
      return res.json({ success: true, message });
    } catch (error) {
      console.error('Error in CadastrarItemController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CadastrarItemController };
