/*
  Warnings:

  - You are about to drop the column `qntd` on the `adicionais` table. All the data in the column will be lost.
  - Added the required column `qntd_max` to the `adicionais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qntd_min` to the `adicionais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sabores` to the `tamanhos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adicionais" DROP COLUMN "qntd",
ADD COLUMN     "qntd_max" INTEGER NOT NULL,
ADD COLUMN     "qntd_min" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tamanhos" ADD COLUMN     "sabores" INTEGER NOT NULL;
