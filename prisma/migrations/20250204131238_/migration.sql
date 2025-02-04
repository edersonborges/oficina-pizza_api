-- AlterTable
ALTER TABLE "categoria" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "subCategoria" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT false;
