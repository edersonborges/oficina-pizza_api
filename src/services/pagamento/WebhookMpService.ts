import mercadopago from '../../configs/mercadopago';
import prisma from '../../prisma';

class WebhookMpService {
  async execute(paymentId: string) {
    console.log(paymentId);
    try {
      // Força o uso de "any" para acessar o método "findById"
      const payment = await (mercadopago as any).payment.findById(paymentId);

      if (!payment) {
        throw new Error('Payment not found');
      }

      const paymentStatus = payment.body.status;
      const visitanteId = payment.body.external_reference;

      if (paymentStatus === 'approved') {
        console.log(`Pagamento aprovado para o ID ${paymentId}`);
        // Aqui você pode atualizar o status do pagamento no seu sistema
        console.log(`Status de pagamento atualizado para o visitante com ID: ${visitanteId}`);
      } else if (paymentStatus === 'pending') {
        console.log(`Pagamento pendente para o ID ${visitanteId}`);
      } else {
        console.log(`Status do pagamento: ${paymentStatus}`);
      }
    } catch (error: any) {
      if (error.message.includes('Payment not found')) {
        console.error('Erro: O pagamento não foi encontrado. Verifique se o ID está correto e o pagamento foi criado com sucesso.');
      } else {
        console.error('Erro ao processar o pagamento:', error);
      }
      throw new Error(`Erro ao processar o pagamento: ${error.message}`);
    }
  }
}

export { WebhookMpService };
