-- AlterTable
ALTER TABLE `fontsAlert` ADD COLUMN `bundle_id` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `bundle_order` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `font_id` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sender_auth` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `sender_email` VARCHAR(191) NOT NULL DEFAULT '';