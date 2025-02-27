/*
  Warnings:

  - You are about to drop the column `promocao_id` on the `arquivos` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `promocao` table. All the data in the column will be lost.
  - Added the required column `dataFim` to the `promocao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `promocao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorPromocao` to the `promocao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "arquivos" DROP CONSTRAINT "arquivos_promocao_id_fkey";

-- AlterTable
ALTER TABLE "arquivos" DROP COLUMN "promocao_id";

-- AlterTable
ALTER TABLE "promocao" DROP COLUMN "valor",
ADD COLUMN     "dataFim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "valorPromocao" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "promocao_itens" ADD COLUMN     "img_key" TEXT,
ADD COLUMN     "promocaoId" TEXT;

-- AddForeignKey
ALTER TABLE "promocao_itens" ADD CONSTRAINT "promocao_itens_promocaoId_fkey" FOREIGN KEY ("promocaoId") REFERENCES "promocao"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
