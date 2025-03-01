import { Request, Response } from 'express';
import { WebhookMpService } from '../../services/pagamento/WebhookMpService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class WebhookMpController {
  private webhookMpService: WebhookMpService;

  constructor(webhookMpService: WebhookMpService) {
    this.webhookMpService = webhookMpService;
  }

  async handle(req: Request, res: Response) {
    const paymentId = req.query.id || req.body.data?.id; // Obtém o ID do pagamento
    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID not found' });
    }
    try {
      await this.webhookMpService.execute(paymentId as string);
      return res.status(200).send('Webhook processed successfully');
    } catch (error) {
      console.error('Error in WebhookMpController:', error);
      return res.status(500).json({ error: 'Could not process the webhook' });
    }
  }
}

export { WebhookMpController };
