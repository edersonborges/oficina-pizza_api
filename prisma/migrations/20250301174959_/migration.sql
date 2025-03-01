-- CreateEnum
CREATE TYPE "TipoPedido" AS ENUM ('ENTREGA', 'RETIRADA');

-- AlterTable
ALTER TABLE "pedido" ADD COLUMN     "tipoPedido" "TipoPedido" NOT NULL DEFAULT 'RETIRADA',
ADD COLUMN     "valorTotal" DOUBLE PRECISION;
