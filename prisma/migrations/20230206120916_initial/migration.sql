/*
  Warnings:

  - You are about to alter the column `temperature` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `humidity` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `pressure` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Log` MODIFY `temperature` DOUBLE NOT NULL,
    MODIFY `humidity` DOUBLE NOT NULL,
    MODIFY `pressure` DOUBLE NOT NULL;
