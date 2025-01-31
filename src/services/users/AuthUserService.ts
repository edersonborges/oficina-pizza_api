import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../../configs/config';

interface AuthRequest {
  email: string;
  senha: string;
}

class AuthUserService {
  async execute({ email, senha }: AuthRequest) {
    const usuario = await prismaClient.usuario.findFirst({
      where: {
        email,
        deletedAt: null
      }
    });

    if (!usuario || !(await compare(senha, usuario.senha))) {
      return 'Usuário ou senha incorretos. Tente novamente.';
    }

    // A verificação abaixo é redundante, pois já filtramos por deletedAt: null
    // Porém, mantenho caso tenha alguma lógica específica
    if (usuario.deletedAt !== null) {
      return 'Usuário não encontrado.';
    }

    const jwtSecret = JWT_SECRET;

    if (!jwtSecret) {
      return 'Chave secreta JWT não definida.';
    }

    const token = sign(
      {
        nome: usuario.nome,
        email: usuario.email, // Alterado para incluir 'email' no token
      },
      jwtSecret,
      {
        subject: usuario.id.toString(),
        expiresIn: '1d',
      }
    );

    return {
      message: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email, // Incluído 'email' na resposta
        token: token,
      }
    };
  }
}

export { AuthUserService };
