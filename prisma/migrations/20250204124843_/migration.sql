/*
  Warnings:

  - Added the required column `tipo` to the `categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categoria" ADD COLUMN     "tipo" TEXT NOT NULL;
