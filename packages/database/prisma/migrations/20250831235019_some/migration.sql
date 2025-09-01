/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `asktutor` DROP FOREIGN KEY `asktutor_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `classroom` DROP FOREIGN KEY `classroom_userId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `enrollment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_userId_fkey`;

-- DropForeignKey
ALTER TABLE `lessonprogress` DROP FOREIGN KEY `lessonprogress_userId_fkey`;

-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `otp_userId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `quickcart` DROP FOREIGN KEY `quickcart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `ticket_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ticketmessage` DROP FOREIGN KEY `ticketmessage_userId_fkey`;

-- DropForeignKey
ALTER TABLE `wallet` DROP FOREIGN KEY `wallet_userId_fkey`;

-- DropIndex
DROP INDEX `asktutor_userId_fkey` ON `asktutor`;

-- DropIndex
DROP INDEX `comment_authorId_fkey` ON `comment`;

-- DropIndex
DROP INDEX `enrollment_userId_fkey` ON `enrollment`;

-- DropIndex
DROP INDEX `otp_userId_fkey` ON `otp`;

-- DropIndex
DROP INDEX `payment_userId_fkey` ON `payment`;

-- DropIndex
DROP INDEX `quickcart_userId_fkey` ON `quickcart`;

-- DropIndex
DROP INDEX `review_userId_fkey` ON `review`;

-- DropIndex
DROP INDEX `ticket_userId_fkey` ON `ticket`;

-- DropIndex
DROP INDEX `ticketmessage_userId_fkey` ON `ticketmessage`;

-- AlterTable
ALTER TABLE `asktutor` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cart` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `classroom` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `comment` MODIFY `authorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `enrollment` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `image` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `lessonprogress` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `otp` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `quickcart` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ticket` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ticketmessage` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `wallet` MODIFY `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `account`;

-- DropTable
DROP TABLE `session`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `verificationtoken`;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `provider_account_id` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `accounts_provider_provider_account_id_key`(`provider`, `provider_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `session_token` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_session_token_key`(`session_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_tokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verification_tokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lessonprogress` ADD CONSTRAINT `lessonprogress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `enrollment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallet` ADD CONSTRAINT `wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket` ADD CONSTRAINT `ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticketmessage` ADD CONSTRAINT `ticketmessage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asktutor` ADD CONSTRAINT `asktutor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classroom` ADD CONSTRAINT `classroom_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quickcart` ADD CONSTRAINT `quickcart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
