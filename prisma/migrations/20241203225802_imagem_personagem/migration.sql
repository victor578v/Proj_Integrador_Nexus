/*
  Warnings:

  - A unique constraint covering the columns `[imagemId]` on the table `personagens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imagemId` to the `personagens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personagens" ADD COLUMN     "imagemId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "personagens_imagemId_key" ON "personagens"("imagemId");

-- AddForeignKey
ALTER TABLE "personagens" ADD CONSTRAINT "personagens_imagemId_fkey" FOREIGN KEY ("imagemId") REFERENCES "imagens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
