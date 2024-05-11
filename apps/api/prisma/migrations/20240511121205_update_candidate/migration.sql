-- CreateTable
CREATE TABLE `candidates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jobId` INTEGER NULL,
    `candidateProfileId` INTEGER NULL,
    `status` ENUM('Offer', 'Interview', 'Successful', 'Unsuccessful') NOT NULL DEFAULT 'Offer',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `interviewSchedule` DATETIME(3) NULL,
    `recheduleInterview` DATETIME(3) NULL,
    `interviewType` ENUM('Online', 'Offline') NULL DEFAULT 'Online',
    `interviewUrl` VARCHAR(191) NULL,
    `interviewLocation` VARCHAR(191) NULL,
    `candidateId` INTEGER NULL,

    UNIQUE INDEX `Interview_candidateId_key`(`candidateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `candidates` ADD CONSTRAINT `candidates_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidates` ADD CONSTRAINT `candidates_candidateProfileId_fkey` FOREIGN KEY (`candidateProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interview` ADD CONSTRAINT `Interview_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `candidates`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
