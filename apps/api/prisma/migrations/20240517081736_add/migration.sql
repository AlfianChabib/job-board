-- AlterTable
ALTER TABLE `Interview` ADD COLUMN `interviewStatus` ENUM('Sending', 'Accept', 'Rescheduling', 'Finished') NULL DEFAULT 'Sending';
