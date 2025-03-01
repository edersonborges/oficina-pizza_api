import mercadopago from '../../configs/mercadopago';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

class CreatePixPaymentService {
  async execute({
    transaction_amount,
    description,
    payer_email,
    visitanteId,
  }: {
    transaction_amount: number;
    description: string;
    payer_email: string;
    visitanteId: string;
  }) {
    try {
      // Gerar chave de idempotência (UUID)
      const idempotencyKey = uuidv4();

      const paymentData = {
        transaction_amount,
        description,
        payment_method_id: 'pix',
        payer: {
          email: payer_email,
        },
        notification_url: process.env.NOTIFICATION_URL_MP,
        external_reference: visitanteId.toString(),
      };

      // Utilize 'Payment' com "P" maiúsculo conforme o SDK atual
      const payment = await (mercadopago as any).payment.create(paymentData, {
        headers: {
          'X-Idempotency-Key': idempotencyKey,
        },
      });


      return {
        id: payment.body.id,
        status: payment.body.status,
        qr_code: payment.body.point_of_interaction.transaction_data.qr_code,
        qr_code_base64: payment.body.point_of_interaction.transaction_data.qr_code_base64,
        payment_link: payment.body.point_of_interaction.transaction_data.ticket_url,
      };
    } catch (error: any) {
      console.error('Error creating Pix payment:', error.message);
      throw new Error('Could not create Pix payment');
    }
  }
}

export { CreatePixPaymentService };
