import prismaClient from '../../prisma';

class ListarPedidosUserService {
  async execute(usuarioId: string) {
    const pedidos = await prismaClient.pedido.findMany({
      where: {
        usuarioId,
        deletedAt: null,
      },
      include: {
        itens: true,
        cupom: true,
        pagamentos: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return pedidos;
  }
}

export { ListarPedidosUserService };
