import { Request as ExpressRequest } from 'express';
import prismaClient from '../../prisma';

class UpdateUserService {
  public async execute(req: ExpressRequest) {
    const { id } = req.params;
    const { nome, telefone, tipoImagem, img_key } = req.body;

    try {
      const data: any = {};

      if (nome) data.nome = nome;
      if (telefone) data.telefone = telefone;

      // Verificando se o usuário existe
      const existingUser = await prismaClient.usuario.findUnique({ where: { id } });
      if (!existingUser) {
        return { message: 'Usuário não encontrado' };
      }

      // Atualizando o usuário
      const user = await prismaClient.usuario.update({
        where: { id },
        data,
      });

      // Se houver um img_key fornecido, verificar e atualizar/criar registro de Arquivo
      if (img_key) {
        // Procurar um arquivo existente para o mesmo usuário e tipo
        const existingFile = await prismaClient.arquivos.findFirst({
          where: {
            userId: id,
            tipo: tipoImagem,
          },
        });

        if (existingFile) {
          // Atualizar o imgKey do arquivo existente
          await prismaClient.arquivos.update({
            where: { id: existingFile.id },
            data: { img_key: img_key },
          });
        } else {
          // Criar um novo registro de arquivo para o usuário
          await prismaClient.arquivos.create({
            data: {
              userId: id,
              tipo: tipoImagem,
              img_key: img_key,
            },
          });
        }
      }

      return { message: 'Usuário atualizado com sucesso', user };
    } catch (error: any) {
      console.error('Error in UpdateUserService:', error);
      return { message: 'Falha ao atualizar informações do usuário', error: error.message };
    }
  }
}

export { UpdateUserService };
