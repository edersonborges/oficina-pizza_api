/*
  Warnings:

  - Added the required column `publico` to the `cupom_desconto` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipoDesc` on the `cupom_desconto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CupomPublico" AS ENUM ('CLIENTES', 'CLIENTES_NOVOS', 'ANIVERSARIANTES');

-- CreateEnum
CREATE TYPE "CupomTipoDesc" AS ENUM ('FIXO', 'ENTREGA_GRATIS', 'PORCENTAGEM');

-- AlterTable
ALTER TABLE "cupom_desconto" ADD COLUMN     "publico" "CupomPublico" NOT NULL,
DROP COLUMN "tipoDesc",
ADD COLUMN     "tipoDesc" "CupomTipoDesc" NOT NULL;
