/*
  Warnings:

  - Added the required column `nodeId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Log` ADD COLUMN `nodeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_nodeId_fkey` FOREIGN KEY (`nodeId`) REFERENCES `Node`(`nodeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
