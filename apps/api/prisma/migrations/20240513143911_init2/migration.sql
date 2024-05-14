/*
  Warnings:

  - You are about to drop the column `label` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `Label` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Text` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Skill` DROP COLUMN `label`,
    ADD COLUMN `Label` INTEGER NOT NULL,
    ADD COLUMN `Text` VARCHAR(191) NOT NULL;
