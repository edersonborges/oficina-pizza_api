-- CreateEnum
CREATE TYPE "PedidoStatus" AS ENUM ('ABERTO', 'EM_PRODUCAO', 'SAIU_PARA_ENTREGA', 'ENTREGUE', 'CANCELADO');

-- AlterTable
ALTER TABLE "pedido" ADD COLUMN     "cupom_id" TEXT,
ADD COLUMN     "status" "PedidoStatus" NOT NULL DEFAULT 'ABERTO';

-- AlterTable
ALTER TABLE "pedido_itens" ADD COLUMN     "massaId" TEXT,
ADD COLUMN     "tamanhoId" TEXT;

-- CreateTable
CREATE TABLE "pedido_itens_sabores" (
    "_id" TEXT NOT NULL,
    "pedido_itens_id" TEXT NOT NULL,
    "sabor_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedido_itens_sabores_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_cupom_id_fkey" FOREIGN KEY ("cupom_id") REFERENCES "cupom_desconto"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_tamanhoId_fkey" FOREIGN KEY ("tamanhoId") REFERENCES "tamanhos"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_massaId_fkey" FOREIGN KEY ("massaId") REFERENCES "massas"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens_sabores" ADD CONSTRAINT "pedido_itens_sabores_pedido_itens_id_fkey" FOREIGN KEY ("pedido_itens_id") REFERENCES "pedido_itens"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens_sabores" ADD CONSTRAINT "pedido_itens_sabores_sabor_id_fkey" FOREIGN KEY ("sabor_id") REFERENCES "sabores"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
