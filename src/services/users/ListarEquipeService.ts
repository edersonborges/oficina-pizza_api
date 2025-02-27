import prismaClient from '../../prisma';

class ListarEquipeService {
  async execute() {
    const equipe = await prismaClient.usuario.findMany({
      where: {
        tipo: { in: [1, 2] },
        deletedAt: null, // opcional: só retorna usuários não deletados
      },
    });
    return equipe;
  }
}

export { ListarEquipeService };
