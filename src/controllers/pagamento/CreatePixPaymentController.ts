import { Request, Response } from 'express';
import { CreatePixPaymentService } from '../../services/pagamento/CreatePixPaymentService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class CreatePixPaymentController {
  private createPixPaymentService: CreatePixPaymentService;

  constructor(createPixPaymentService: CreatePixPaymentService) {
    this.createPixPaymentService = createPixPaymentService;
  }

  async handle(req: Request, res: Response) {
    const { transaction_amount, description, payer_email, visitanteId } = req.body;
    try {
      const payment = await this.createPixPaymentService.execute({
        transaction_amount,
        description,
        payer_email,
        visitanteId,
      });
      return res.status(201).json({ success: true, payment: serializeBigInt(payment) });
    } catch (error) {
      console.error('Error in CreatePixPaymentController:', error);
      return res.status(500).json({ error: 'Could not create Pix payment' });
    }
  }
}

export { CreatePixPaymentController };
