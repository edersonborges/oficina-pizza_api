import MercadoPago from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

const mp = new MercadoPago({
  accessToken: process.env.MP_TOKEN!,
});


export default mp;
