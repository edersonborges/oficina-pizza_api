import prismaClient from '../../prisma';

class DeletarEnderecoUserService {
  async execute(enderecoId: string, usuarioId: string) {
    // Busca o endereço
    const endereco = await prismaClient.endereco.findUnique({
      where: { id: enderecoId },
    });
    if (!endereco) {
      throw new Error('Endereço não encontrado');
    }
    if (endereco.usuarioId !== usuarioId) {
      throw new Error('Acesso negado: este endereço não pertence ao usuário');
    }
    if (endereco.deletedAt) {
      throw new Error('Este endereço já foi removido');
    }

    // Soft delete: atualiza deletedAt
    const enderecoDeletado = await prismaClient.endereco.update({
      where: { id: enderecoId },
      data: {
        deletedAt: new Date(),
      },
    });

    return enderecoDeletado;
  }
}

export { DeletarEnderecoUserService };
