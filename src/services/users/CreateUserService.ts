import { validate } from 'class-validator';
import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import { CreateUserDTO } from '../../DTO/CreateUserDTO';
import { pesquisaGeoLoc } from '../../utils/pesquisaGeoLoc'; // Import da função

interface CreateUserInput {
  nome: string;
  senha: string;
  email: string;
  telefone: string;
  cpf?: string;
  dataNasc?: string; // campo opcional

  // Endereço (opcional)
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  complemento?: string;
  padrao?: boolean;
}

class CreateUserService {
  async execute(createUserInput: CreateUserInput) {
    try {
      // 1) Validar input
      const createUserDTO = new CreateUserDTO(createUserInput);
      const errors = await validate(createUserDTO);

      if (errors.length > 0) {
        const errorMessage = errors
          .map(error =>
            error.constraints ? Object.values(error.constraints).join(', ') : ''
          )
          .filter(msg => msg)
          .join('. ');
        return errorMessage;
      }

      const {
        nome,
        email,
        senha,
        telefone,
        cpf,
        dataNasc,

        // Endereço
        rua,
        numero,
        bairro,
        cidade,
        cep,
        complemento,
        padrao,
      } = createUserInput;

      // 2) Verifica convite
      const convite = await prismaClient.convite.findFirst({
        where: { email, utilizado: false },
      });
      console.log(convite);

      // 3) Define tipo do usuário
      const tipoUsuario = convite ? convite.tipo : 3;

      // 4) Verifica telefone
      const existingUserByTelefone = await prismaClient.usuario.findFirst({ where: { telefone } });
      if (existingUserByTelefone) {
        return 'O telefone informado já está em uso por outro usuário.';
      }

      // 5) Verifica email
      const existingUserByEmail = await prismaClient.usuario.findFirst({ where: { email } });
      if (existingUserByEmail) {
        return 'O email informado já está em uso por outro usuário.';
      }

      // 6) Verifica CPF somente se foi fornecido
      if (cpf) {
        const existingUserByCpf = await prismaClient.usuario.findFirst({ where: { cpf } });
        if (existingUserByCpf) {
          return 'O CPF informado já está em uso por outro usuário.';
        }
      }

      // 7) Hash da senha
      const hashedPassword = await hash(senha, 10);

      // 8) Converte dataNasc (caso exista) para Date
      const dateOfBirth = dataNasc ? new Date(dataNasc) : undefined;

      // 9) Cria o usuário
      const user = await prismaClient.usuario.create({
        data: {
          nome,
          email,
          senha: hashedPassword,
          telefone,
          cpf,
          dataNasc: dateOfBirth,
          tipo: tipoUsuario,
        },
      });

      // 10) Marca convite como utilizado (caso exista)
      if (convite) {
        await prismaClient.convite.update({
          where: { id: convite.id },
          data: { utilizado: true },
        });
      }

      // 11) Se o usuário passou dados de endereço (rua, numero, etc.), criamos registro
      if (rua && numero && bairro && cidade && cep) {
        // Montar string do endereço para geolocalização
        const enderecoCompleto = `${rua}, ${numero}, ${bairro}, ${cidade}, ${cep}`;
        const geo = await pesquisaGeoLoc(enderecoCompleto);

        let latitude = 0;
        let longitude = 0;
        if (geo) {
          latitude = parseFloat(geo.latitude);
          longitude = parseFloat(geo.longitude);
        }

        await prismaClient.endereco.create({
          data: {
            usuarioId: user.id,
            rua,
            numero,
            bairro,
            cidade,
            cep,
            complemento: complemento ?? null,
            padrao: padrao ?? false,
            latitude,
            longitude,
          },
        });
      }

      return { message: user };
    } catch (error) {
      console.error('Falha ao criar usuário:', error);
      return 'Falha ao criar usuário';
    }
  }
}

export { CreateUserService };
