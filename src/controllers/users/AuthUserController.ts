import { Request, Response } from 'express';
import { AuthUserService } from '../../services/users/AuthUserService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class AuthUserController {
  private authService: AuthUserService;

  constructor(authUserService: AuthUserService) {
    this.authService = authUserService;
  }

  async handle(req: Request, res: Response) {
    const { email, senha } = req.body;

    // Validação básica
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Formato de email inválido.' });
    }

    try {
      const result = await this.authService.execute({ email, senha });

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      const message = serializeBigInt(result);
      return res.json({ success: true, message });

    } catch (error) {
      console.error('Error in AuthUserController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { AuthUserController };
