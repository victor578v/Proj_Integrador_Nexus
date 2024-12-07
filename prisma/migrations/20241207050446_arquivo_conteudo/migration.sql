/*
  Warnings:

  - You are about to drop the column `url` on the `arquivos` table. All the data in the column will be lost.
  - Added the required column `conteudo` to the `arquivos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "arquivos" DROP COLUMN "url",
ADD COLUMN     "conteudo" TEXT NOT NULL;
