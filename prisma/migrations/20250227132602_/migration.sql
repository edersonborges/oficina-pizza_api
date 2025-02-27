-- AlterTable
ALTER TABLE "arquivos" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "arquivos" ADD CONSTRAINT "arquivos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
