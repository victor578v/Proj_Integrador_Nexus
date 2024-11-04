/*
  Warnings:

  - A unique constraint covering the columns `[imagemId]` on the table `mesas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descricao` to the `mesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagemId` to the `mesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mesas` ADD COLUMN `descricao` VARCHAR(191) NOT NULL,
    ADD COLUMN `imagemId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `imagens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `tamanho` INTEGER NOT NULL,
    `url` VARCHAR(191) NULL,
    `dados` LONGBLOB NULL,
    `descricao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `mesas_imagemId_key` ON `mesas`(`imagemId`);

-- AddForeignKey
ALTER TABLE `mesas` ADD CONSTRAINT `mesas_imagemId_fkey` FOREIGN KEY (`imagemId`) REFERENCES `imagens`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
