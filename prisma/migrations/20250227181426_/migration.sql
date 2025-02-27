/*
  Warnings:

  - You are about to drop the column `publico` on the `cupom_desconto` table. All the data in the column will be lost.
  - You are about to drop the column `qntd` on the `cupom_desconto` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `cupom_desconto` table. All the data in the column will be lost.
  - Added the required column `nome` to the `cupom_desconto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qntdDisponivel` to the `cupom_desconto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoDesc` to the `cupom_desconto` table without a default value. This is not possible if the table is not empty.
  - Made the column `dataFim` on table `cupom_desconto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cupom_desconto" DROP COLUMN "publico",
DROP COLUMN "qntd",
DROP COLUMN "tipo",
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "qntdDisponivel" INTEGER NOT NULL,
ADD COLUMN     "tipoDesc" TEXT NOT NULL,
ALTER COLUMN "dataFim" SET NOT NULL,
ALTER COLUMN "valor" DROP NOT NULL;
