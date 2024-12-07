-- CreateTable
CREATE TABLE "arquivos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mesaId" INTEGER NOT NULL,

    CONSTRAINT "arquivos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "arquivos" ADD CONSTRAINT "arquivos_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "mesas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
