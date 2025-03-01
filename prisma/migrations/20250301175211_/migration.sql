/*
  Warnings:

  - The values [ABERTO] on the enum `PedidoStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PedidoStatus_new" AS ENUM ('AGUARDANDO_PAGAMENTO', 'PENDENTE', 'EM_PRODUCAO', 'SAIU_PARA_ENTREGA', 'ENTREGUE', 'CANCELADO');
ALTER TABLE "pedido" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "pedido" ALTER COLUMN "status" TYPE "PedidoStatus_new" USING ("status"::text::"PedidoStatus_new");
ALTER TYPE "PedidoStatus" RENAME TO "PedidoStatus_old";
ALTER TYPE "PedidoStatus_new" RENAME TO "PedidoStatus";
DROP TYPE "PedidoStatus_old";
ALTER TABLE "pedido" ALTER COLUMN "status" SET DEFAULT 'PENDENTE';
COMMIT;

-- AlterTable
ALTER TABLE "pedido" ALTER COLUMN "status" SET DEFAULT 'PENDENTE';
