-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mesas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sistema" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "vagas" BOOLEAN NOT NULL DEFAULT false,
    "mestre_mesa" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "imagemId" INTEGER NOT NULL,

    CONSTRAINT "mesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagens" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "imagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensagens" (
    "id" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "mesaId" INTEGER NOT NULL,

    CONSTRAINT "mensagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personagens" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL DEFAULT 'Sem Personagem',
    "vidaMaxima" INTEGER NOT NULL DEFAULT 0,
    "vidaAtual" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "mesaId" INTEGER NOT NULL,

    CONSTRAINT "personagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MesaUsuarios" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mesas_imagemId_key" ON "mesas"("imagemId");

-- CreateIndex
CREATE UNIQUE INDEX "personagens_userId_mesaId_key" ON "personagens"("userId", "mesaId");

-- CreateIndex
CREATE UNIQUE INDEX "_MesaUsuarios_AB_unique" ON "_MesaUsuarios"("A", "B");

-- CreateIndex
CREATE INDEX "_MesaUsuarios_B_index" ON "_MesaUsuarios"("B");

-- AddForeignKey
ALTER TABLE "mesas" ADD CONSTRAINT "mesas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesas" ADD CONSTRAINT "mesas_imagemId_fkey" FOREIGN KEY ("imagemId") REFERENCES "imagens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "mesas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personagens" ADD CONSTRAINT "personagens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personagens" ADD CONSTRAINT "personagens_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "mesas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MesaUsuarios" ADD CONSTRAINT "_MesaUsuarios_A_fkey" FOREIGN KEY ("A") REFERENCES "mesas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MesaUsuarios" ADD CONSTRAINT "_MesaUsuarios_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
