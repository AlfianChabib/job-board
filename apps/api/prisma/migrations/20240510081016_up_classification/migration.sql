/*
  Warnings:

  - You are about to drop the `Classification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubClassificaion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ClassificationInfo` DROP FOREIGN KEY `ClassificationInfo_classificationId_fkey`;

-- DropForeignKey
ALTER TABLE `ClassificationInfo` DROP FOREIGN KEY `ClassificationInfo_subClassificaionId_fkey`;

-- DropForeignKey
ALTER TABLE `SubClassificaion` DROP FOREIGN KEY `SubClassificaion_classificationId_fkey`;

-- DropTable
DROP TABLE `Classification`;

-- DropTable
DROP TABLE `SubClassificaion`;

-- CreateTable
CREATE TABLE `classifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subClassifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `classificationId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClassificationInfo` ADD CONSTRAINT `ClassificationInfo_classificationId_fkey` FOREIGN KEY (`classificationId`) REFERENCES `classifications`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassificationInfo` ADD CONSTRAINT `ClassificationInfo_subClassificaionId_fkey` FOREIGN KEY (`subClassificaionId`) REFERENCES `subClassifications`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subClassifications` ADD CONSTRAINT `subClassifications_classificationId_fkey` FOREIGN KEY (`classificationId`) REFERENCES `classifications`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
