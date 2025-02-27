/*
  Warnings:

  - The primary key for the `pagamentos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pagamentos` table. All the data in the column will be lost.
  - You are about to drop the column `pedidoId` on the `pagamentos` table. All the data in the column will be lost.
  - The primary key for the `pedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `descricao` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `pedido` table. All the data in the column will be lost.
  - The required column `_id` was added to the `pagamentos` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `forma` to the `pagamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pedido_id` to the `pagamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `pagamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transacaoId` to the `pagamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `pagamentos` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `pedido` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_pedidoId_fkey";

-- AlterTable
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_pkey",
DROP COLUMN "id",
DROP COLUMN "pedidoId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "forma" TEXT NOT NULL,
ADD COLUMN     "pedido_id" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "transacaoId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "pedido" DROP CONSTRAINT "pedido_pkey",
DROP COLUMN "descricao",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "forma_pagamento_id" TEXT,
ADD COLUMN     "loja_id" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usuario_id" TEXT,
ADD CONSTRAINT "pedido_pkey" PRIMARY KEY ("_id");

-- CreateTable
CREATE TABLE "usuario" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "endereco" (
    "_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "complemento" TEXT,
    "padrao" BOOLEAN NOT NULL DEFAULT false,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "subCategoria" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "subCategoria_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "arquivos" (
    "_id" TEXT NOT NULL,
    "img_key" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "loja_id" TEXT,
    "promocao_id" TEXT,

    CONSTRAINT "arquivos_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "itens" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "imagem_id" TEXT,
    "sub_categoria_id" TEXT NOT NULL,

    CONSTRAINT "itens_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "sabores" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "imagem_id" TEXT,

    CONSTRAINT "sabores_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "massas" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "imagem_id" TEXT,

    CONSTRAINT "massas_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "adicionais" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "qntd" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "adicionais_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "tamanhos" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "pedacos" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tamanhos_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "loja" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "pedidoMin" DOUBLE PRECISION NOT NULL,
    "cep" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "loja_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "horarioFuncionamento" (
    "_id" TEXT NOT NULL,
    "diaSemana" INTEGER NOT NULL,
    "horaAbertura" TIMESTAMP(3),
    "horaFechamento" TIMESTAMP(3),
    "aberto" BOOLEAN NOT NULL DEFAULT true,
    "loja_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "horarioFuncionamento_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "pausaServico" (
    "_id" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),
    "descricao" TEXT,
    "loja_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pausaServico_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "feriado" (
    "_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horaAbertura" TIMESTAMP(3),
    "horaFechamento" TIMESTAMP(3),
    "aberto" BOOLEAN NOT NULL DEFAULT true,
    "descricao" TEXT,
    "loja_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feriado_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "entrega" (
    "_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "tempo" TEXT NOT NULL,
    "taxa" DOUBLE PRECISION NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entrega_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "cupom_desconto" (
    "_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "publico" BOOLEAN NOT NULL,
    "qntd" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "cupom_desconto_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "promocao" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promocao_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "promocao_itens" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promocao_itens_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "forma_pagamento" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forma_pagamento_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "avaliacoes" (
    "_id" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "pedido_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "pedido_itens" (
    "_id" TEXT NOT NULL,
    "pedido_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedido_itens_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "pedido_itens_adc" (
    "_id" TEXT NOT NULL,
    "pedido_itens_id" TEXT NOT NULL,
    "adicional_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedido_itens_adc_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "_itensTosabores" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_itensTomassas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_itensTotamanhos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_adicionaisToitens" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_itensTosabores_AB_unique" ON "_itensTosabores"("A", "B");

-- CreateIndex
CREATE INDEX "_itensTosabores_B_index" ON "_itensTosabores"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_itensTomassas_AB_unique" ON "_itensTomassas"("A", "B");

-- CreateIndex
CREATE INDEX "_itensTomassas_B_index" ON "_itensTomassas"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_itensTotamanhos_AB_unique" ON "_itensTotamanhos"("A", "B");

-- CreateIndex
CREATE INDEX "_itensTotamanhos_B_index" ON "_itensTotamanhos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_adicionaisToitens_AB_unique" ON "_adicionaisToitens"("A", "B");

-- CreateIndex
CREATE INDEX "_adicionaisToitens_B_index" ON "_adicionaisToitens"("B");

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subCategoria" ADD CONSTRAINT "subCategoria_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arquivos" ADD CONSTRAINT "arquivos_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "loja"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arquivos" ADD CONSTRAINT "arquivos_promocao_id_fkey" FOREIGN KEY ("promocao_id") REFERENCES "promocao"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_imagem_id_fkey" FOREIGN KEY ("imagem_id") REFERENCES "arquivos"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_sub_categoria_id_fkey" FOREIGN KEY ("sub_categoria_id") REFERENCES "subCategoria"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sabores" ADD CONSTRAINT "sabores_imagem_id_fkey" FOREIGN KEY ("imagem_id") REFERENCES "arquivos"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "massas" ADD CONSTRAINT "massas_imagem_id_fkey" FOREIGN KEY ("imagem_id") REFERENCES "arquivos"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarioFuncionamento" ADD CONSTRAINT "horarioFuncionamento_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "loja"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pausaServico" ADD CONSTRAINT "pausaServico_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "loja"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feriado" ADD CONSTRAINT "feriado_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "loja"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_forma_pagamento_id_fkey" FOREIGN KEY ("forma_pagamento_id") REFERENCES "forma_pagamento"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "loja"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "itens"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens_adc" ADD CONSTRAINT "pedido_itens_adc_pedido_itens_id_fkey" FOREIGN KEY ("pedido_itens_id") REFERENCES "pedido_itens"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens_adc" ADD CONSTRAINT "pedido_itens_adc_adicional_id_fkey" FOREIGN KEY ("adicional_id") REFERENCES "adicionais"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_itensTosabores" ADD CONSTRAINT "_itensTosabores_A_fkey" FOREIGN KEY ("A") REFERENCES "itens"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_itensTosabores" ADD CONSTRAINT "_itensTosabores_B_fkey" FOREIGN KEY ("B") REFERENCES "sabores"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_itensTomassas" ADD CONSTRAINT "_itensTomassas_A_fkey" FOREIGN KEY ("A") REFERENCES "itens"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_itensTomassas" ADD CONSTRAINT "_itensTomassas_B_fkey" FOREIGN KEY ("B") REFERENCES "massas"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_itensTotamanhos" ADD CONSTRAINT "_itensTotamanhos_A_fkey" FOREIGN KEY ("A") REFERENCES "itens"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_itensTotamanhos" ADD CONSTRAINT "_itensTotamanhos_B_fkey" FOREIGN KEY ("B") REFERENCES "tamanhos"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adicionaisToitens" ADD CONSTRAINT "_adicionaisToitens_A_fkey" FOREIGN KEY ("A") REFERENCES "adicionais"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adicionaisToitens" ADD CONSTRAINT "_adicionaisToitens_B_fkey" FOREIGN KEY ("B") REFERENCES "itens"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
