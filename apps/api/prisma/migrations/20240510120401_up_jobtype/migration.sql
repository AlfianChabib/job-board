-- AlterTable
ALTER TABLE `jobs` ADD COLUMN `jobType` ENUM('PartTime', 'FullTime', 'Contract') NOT NULL DEFAULT 'PartTime';
