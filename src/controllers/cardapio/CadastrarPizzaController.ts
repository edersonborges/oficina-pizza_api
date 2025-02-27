import { Request, Response } from 'express';
import { CadastrarPizzaService } from '../../services/cardapio/CadastrarPizzaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CadastrarPizzaController {
  private cadastrarPizzaService: CadastrarPizzaService;

  constructor(cadastrarPizzaService: CadastrarPizzaService) {
    this.cadastrarPizzaService = cadastrarPizzaService;
  }

  async handle(req: Request, res: Response) {
    const { item, sabores, massas, adicionais, tamanhos } = req.body;

    try {
      const result = await this.cadastrarPizzaService.execute({
        item,
        sabores: sabores || [],
        massas: massas || [],
        adicionais: adicionais || [],
        tamanhos: tamanhos || [],
      });

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      const message = serializeBigInt(result);
      return res.json({ success: true, message });
    } catch (error) {
      console.error('Error in CadastrarPizzaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CadastrarPizzaController };
