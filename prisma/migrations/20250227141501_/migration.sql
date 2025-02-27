/*
  Warnings:

  - You are about to drop the `_adicionaisToitens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_itensTomassas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_itensTosabores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_itensTotamanhos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemId` to the `adicionais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `massas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `sabores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `tamanhos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProdutoTipo" AS ENUM ('PIZZA', 'BEBIDA', 'OUTRO');

-- DropForeignKey
ALTER TABLE "_adicionaisToitens" DROP CONSTRAINT "_adicionaisToitens_A_fkey";

-- DropForeignKey
ALTER TABLE "_adicionaisToitens" DROP CONSTRAINT "_adicionaisToitens_B_fkey";

-- DropForeignKey
ALTER TABLE "_itensTomassas" DROP CONSTRAINT "_itensTomassas_A_fkey";

-- DropForeignKey
ALTER TABLE "_itensTomassas" DROP CONSTRAINT "_itensTomassas_B_fkey";

-- DropForeignKey
ALTER TABLE "_itensTosabores" DROP CONSTRAINT "_itensTosabores_A_fkey";

-- DropForeignKey
ALTER TABLE "_itensTosabores" DROP CONSTRAINT "_itensTosabores_B_fkey";

-- DropForeignKey
ALTER TABLE "_itensTotamanhos" DROP CONSTRAINT "_itensTotamanhos_A_fkey";

-- DropForeignKey
ALTER TABLE "_itensTotamanhos" DROP CONSTRAINT "_itensTotamanhos_B_fkey";

-- AlterTable
ALTER TABLE "adicionais" ADD COLUMN     "itemId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "itens" ADD COLUMN     "tipoProduto" "ProdutoTipo" NOT NULL DEFAULT 'OUTRO';

-- AlterTable
ALTER TABLE "massas" ADD COLUMN     "itemId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sabores" ADD COLUMN     "itemId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tamanhos" ADD COLUMN     "itemId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_adicionaisToitens";

-- DropTable
DROP TABLE "_itensTomassas";

-- DropTable
DROP TABLE "_itensTosabores";

-- DropTable
DROP TABLE "_itensTotamanhos";

-- AddForeignKey
ALTER TABLE "sabores" ADD CONSTRAINT "sabores_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "itens"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "massas" ADD CONSTRAINT "massas_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "itens"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adicionais" ADD CONSTRAINT "adicionais_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "itens"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tamanhos" ADD CONSTRAINT "tamanhos_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "itens"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
