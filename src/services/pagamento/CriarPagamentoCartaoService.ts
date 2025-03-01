import mercadopago from '../../configs/mercadopago';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

class CriarPagamentoCartaoService {
  async execute({
    valor_transacao,
    descricao,
    token,
    metodo_pagamento,
    parcelas,
    email_comprador,
    nome_cartao,
    visitanteId,
  }: {
    valor_transacao: number;
    descricao: string;
    token: string;
    metodo_pagamento: string;
    parcelas: number;
    email_comprador: string;
    nome_cartao: string;
    visitanteId: string;
  }) {
    try {
      // Gerar chave de idempotência (UUID)
      const idempotencyKey = uuidv4();

      const dadosPagamento = {
        transaction_amount: valor_transacao,
        token,
        description: descricao,
        installments: parcelas,
        payment_method_id: metodo_pagamento,
        payer: {
          email: email_comprador,
          name: nome_cartao,
        },
        notification_url: process.env.NOTIFICATION_URL_MP,
        external_reference: visitanteId,
      };

      // Forçar o uso de "any" para acessar o método "create"
      const pagamento = await (mercadopago as any).payment.create(dadosPagamento, {
        headers: {
          'X-Idempotency-Key': idempotencyKey,
        },
      });

      return {
        id: pagamento.body.id,
        status: pagamento.body.status,
        payment_link: pagamento.body.point_of_interaction?.transaction_data?.ticket_url || null,
      };
    } catch (error: any) {
      console.error('Erro ao criar pagamento via cartão de crédito:', error.message);
      throw new Error('Não foi possível criar o pagamento via cartão de crédito');
    }
  }
}

export { CriarPagamentoCartaoService };
