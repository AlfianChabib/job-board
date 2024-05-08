/*
  Warnings:

  - You are about to drop the column `expire` on the `RefreshToken` table. All the data in the column will be lost.
  - Added the required column `expiry` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RefreshToken` DROP COLUMN `expire`,
    ADD COLUMN `expiry` DATETIME(3) NOT NULL;
