-- AlterTable
ALTER TABLE `mesas` ADD COLUMN `mestre_mesa` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `vagas` BOOLEAN NOT NULL DEFAULT false;
