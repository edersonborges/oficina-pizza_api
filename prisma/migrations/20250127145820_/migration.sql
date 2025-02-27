-- CreateTable
CREATE TABLE "pedido" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "pedidoId" TEXT NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
