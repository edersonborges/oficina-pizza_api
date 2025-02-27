import { validate } from 'class-validator';
import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import { CreateUserDTO } from '../../DTO/CreateUserDTO';

interface CreateUserInput {
    nome: string;
    senha: string;
    email: string;
    telefone: string;
    cpf?: string;
}

class CreateUserService {
    async execute(createUserInput: CreateUserInput) {
        try {
            // Validação dos dados
            const createUserDTO = new CreateUserDTO(createUserInput);
            const errors = await validate(createUserDTO);

            if (errors.length > 0) {
                const errorMessage = errors
                    .map(error =>
                        error.constraints
                            ? Object.values(error.constraints).join(', ')
                            : ''
                    )
                    .filter(msg => msg)
                    .join('. ');
                return errorMessage;
            }

            const { nome, email, senha, telefone, cpf } = createUserInput;

            // Verifica se existe um convite válido para o email fornecido
            const convite = await prismaClient.convite.findFirst({
                where: {
                    email,
                    utilizado: false, // Convite ainda não utilizado
                }
            });
            console.log(convite);

            // Define o tipo do usuário: se houver convite, utiliza o tipo do convite; caso contrário, define como 3.
            const tipoUsuario = convite ? convite.tipo : 3;

            // Verifica se o telefone já está em uso
            const existingUserByTelefone = await prismaClient.usuario.findFirst({ where: { telefone } });
            if (existingUserByTelefone) {
                return 'O telefone informado já está em uso por outro usuário.';
            }

            // Verifica se o email já está em uso
            const existingUserByEmail = await prismaClient.usuario.findFirst({ where: { email } });
            if (existingUserByEmail) {
                return 'O email informado já está em uso por outro usuário.';
            }

            // Verifica se o CPF já existe (somente se fornecido)
            if (cpf) {
                const existingUserByCpf = await prismaClient.usuario.findFirst({ where: { cpf } });
                if (existingUserByCpf) {
                    return 'O CPF informado já está em uso por outro usuário.';
                }
            }

            // Hash da senha
            const hashedPassword = await hash(senha, 10);

            // Cria o usuário com o tipo definido
            const user = await prismaClient.usuario.create({
                data: {
                    nome,
                    email,
                    senha: hashedPassword,
                    telefone,
                    cpf,
                    tipo: tipoUsuario,
                },
            });

            // Se houver convite, marca-o como utilizado
            if (convite) {
                await prismaClient.convite.update({
                    where: { id: convite.id },
                    data: { utilizado: true }
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
