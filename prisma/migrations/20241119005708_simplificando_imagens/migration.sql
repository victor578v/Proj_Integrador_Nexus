/*
  Warnings:

  - You are about to drop the column `dados` on the `imagens` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `imagens` table. All the data in the column will be lost.
  - You are about to drop the column `tamanho` on the `imagens` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `imagens` table. All the data in the column will be lost.
  - Made the column `url` on table `imagens` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `imagens` DROP COLUMN `dados`,
    DROP COLUMN `descricao`,
    DROP COLUMN `tamanho`,
    DROP COLUMN `tipo`,
    MODIFY `url` VARCHAR(191) NOT NULL;
