import prismaClient from '../../prisma';

class DeletarPedidoService {
  async execute(id: string) {
    const pedido = await prismaClient.pedido.findUnique({ where: { id } });
    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }

    // Soft delete
    const pedidoDeletado = await prismaClient.pedido.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return pedidoDeletado;
  }
}

export { DeletarPedidoService };
