-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hashToken` VARCHAR(191) NOT NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,
    `expire` DATETIME(3) NOT NULL,
    `authDetailId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_authDetailId_fkey` FOREIGN KEY (`authDetailId`) REFERENCES `AuthDetail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
