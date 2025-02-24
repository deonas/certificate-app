/*
  Warnings:

  - The primary key for the `Certificate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `certificateId` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Certificate` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Certificate_certificateId_key` ON `Certificate`;

-- AlterTable
ALTER TABLE `Certificate` DROP PRIMARY KEY,
    DROP COLUMN `certificateId`,
    DROP COLUMN `url`,
    ADD COLUMN `certificateUrl` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `joiningLetterUrl` VARCHAR(191) NULL,
    ADD COLUMN `recommendationLetterUrl` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `date` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
