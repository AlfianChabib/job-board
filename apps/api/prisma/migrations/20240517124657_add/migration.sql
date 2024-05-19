-- AlterTable
ALTER TABLE `Interview` MODIFY `interviewStatus` ENUM('Sending', 'Accept', 'Canceled', 'Rescheduling', 'Finished') NULL DEFAULT 'Sending';

-- AlterTable
ALTER TABLE `applications` MODIFY `status` ENUM('Offer', 'Accepted', 'Interview', 'Successful', 'Unsuccessful') NOT NULL DEFAULT 'Offer';
