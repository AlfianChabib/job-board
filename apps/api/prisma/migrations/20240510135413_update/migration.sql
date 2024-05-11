/*
  Warnings:

  - You are about to drop the column `subClassificaionId` on the `ClassificationInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ClassificationInfo` DROP FOREIGN KEY `ClassificationInfo_subClassificaionId_fkey`;

-- AlterTable
ALTER TABLE `ClassificationInfo` DROP COLUMN `subClassificaionId`,
    ADD COLUMN `subClassificationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ClassificationInfo` ADD CONSTRAINT `ClassificationInfo_subClassificationId_fkey` FOREIGN KEY (`subClassificationId`) REFERENCES `subClassifications`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
