-- CreateTable
CREATE TABLE `Node` (
    `nodeId` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`nodeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `logId` INTEGER NOT NULL AUTO_INCREMENT,
    `temperature` INTEGER NOT NULL,
    `humidity` INTEGER NOT NULL,
    `pressure` INTEGER NOT NULL,
    `loggedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`logId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alerts` (
    `alertId` INTEGER NOT NULL AUTO_INCREMENT,
    `alertActive` BOOLEAN NOT NULL DEFAULT true,
    `nodeId` INTEGER NOT NULL,

    PRIMARY KEY (`alertId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alerts` ADD CONSTRAINT `Alerts_nodeId_fkey` FOREIGN KEY (`nodeId`) REFERENCES `Node`(`nodeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
