import prismaClient from '../../prisma';

class ListarPedidosAdminService {
  async execute() {
    // Retornamos todos os pedidos (inclusive deletados?), 
    // ou filtramos por `deletedAt: null` se não quiser mostrar deletados.
    const pedidos = await prismaClient.pedido.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        usuario: true,
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

export { ListarPedidosAdminService };
