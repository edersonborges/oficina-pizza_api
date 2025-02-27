import { Request, Response } from 'express';
import { CadastrarPizzaService } from '../../services/pizza/CadastrarPizzaService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CadastrarPizzaController {
  private cadastrarPizzaService: CadastrarPizzaService;

  constructor(cadastrarPizzaService: CadastrarPizzaService) {
    this.cadastrarPizzaService = cadastrarPizzaService;
  }

  async handle(req: Request, res: Response) {
    // Pegamos arrays do body
    const { sabores, massas, adicionais, tamanhos } = req.body;

    try {
      const result = await this.cadastrarPizzaService.execute({
        sabores: sabores || [],
        massas: massas || [],
        adicionais: adicionais || [],
        tamanhos: tamanhos || [],
      });

      // Se o service retornar string, tratamos como erro
      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      // Caso sucesso, finalizamos
      const message = serializeBigInt(result);
      return res.json({ success: true, message });

    } catch (error) {
      console.error('Error in CadastrarPizzaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CadastrarPizzaController };
