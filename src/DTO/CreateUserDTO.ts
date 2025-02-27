import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    @IsString({ message: 'O nome deve ser uma string.' })
    nome: string;

    @IsNotEmpty({ message: 'O email é obrigatório.' })
    @IsEmail({}, { message: 'Email inválido.' })
    email: string;

    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @IsString({ message: 'A senha deve ser uma string.' })
    senha: string;

    @IsNotEmpty({ message: 'O telefone é obrigatório.' })
    @IsString({ message: 'O telefone deve ser uma string.' })
    telefone: string;

    @IsOptional()
    @IsString({ message: 'O CPF deve ser uma string.' })
    cpf?: string;

    constructor(data: Partial<CreateUserDTO>) {
        Object.assign(this, data);
    }
}
