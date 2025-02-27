/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "cpf" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_key" ON "usuario"("cpf");
