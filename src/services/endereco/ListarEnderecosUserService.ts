import prismaClient from '../../prisma';

class ListarEnderecosUserService {
  async execute(usuarioId: string) {
    // Busca endereços onde usuarioId = id do usuário E deletedAt = null
    const enderecos = await prismaClient.endereco.findMany({
      where: {
        usuarioId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return enderecos;
  }
}

export { ListarEnderecosUserService };
