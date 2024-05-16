/*
  Warnings:

  - Added the required column `resume` to the `applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `applications` ADD COLUMN `resume` VARCHAR(191) NOT NULL;
