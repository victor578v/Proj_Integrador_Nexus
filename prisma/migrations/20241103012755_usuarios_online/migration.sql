-- CreateTable
CREATE TABLE `_MesaUsuarios` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MesaUsuarios_AB_unique`(`A`, `B`),
    INDEX `_MesaUsuarios_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MesaUsuarios` ADD CONSTRAINT `_MesaUsuarios_A_fkey` FOREIGN KEY (`A`) REFERENCES `mesas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MesaUsuarios` ADD CONSTRAINT `_MesaUsuarios_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
