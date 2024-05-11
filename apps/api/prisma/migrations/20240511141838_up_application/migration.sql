/*
  Warnings:

  - You are about to drop the column `candidateId` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `recheduleInterview` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `preferredClassification` on the `UserClassification` table. All the data in the column will be lost.
  - You are about to drop the column `subClassification` on the `UserClassification` table. All the data in the column will be lost.
  - You are about to drop the `candidates` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[applicationId]` on the table `Interview` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Interview` DROP FOREIGN KEY `Interview_candidateId_fkey`;

-- DropForeignKey
ALTER TABLE `candidates` DROP FOREIGN KEY `candidates_candidateProfileId_fkey`;

-- DropForeignKey
ALTER TABLE `candidates` DROP FOREIGN KEY `candidates_jobId_fkey`;

-- AlterTable
ALTER TABLE `Interview` DROP COLUMN `candidateId`,
    DROP COLUMN `recheduleInterview`,
    ADD COLUMN `applicationId` INTEGER NULL,
    ADD COLUMN `rescheduleInterview` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `UserClassification` DROP COLUMN `preferredClassification`,
    DROP COLUMN `subClassification`,
    ADD COLUMN `classificationId` INTEGER NULL,
    ADD COLUMN `subClassificaionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `jobs` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `candidates`;

-- CreateTable
CREATE TABLE `applications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jobId` INTEGER NULL,
    `userProfileId` INTEGER NULL,
    `status` ENUM('Offer', 'Interview', 'Successful', 'Unsuccessful') NOT NULL DEFAULT 'Offer',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Interview_applicationId_key` ON `Interview`(`applicationId`);

-- AddForeignKey
ALTER TABLE `UserClassification` ADD CONSTRAINT `UserClassification_classificationId_fkey` FOREIGN KEY (`classificationId`) REFERENCES `classifications`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserClassification` ADD CONSTRAINT `UserClassification_subClassificaionId_fkey` FOREIGN KEY (`subClassificaionId`) REFERENCES `subClassifications`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interview` ADD CONSTRAINT `Interview_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `applications`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
