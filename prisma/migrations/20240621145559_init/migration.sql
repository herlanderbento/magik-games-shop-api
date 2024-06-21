/*
  Warnings:

  - You are about to alter the column `phone` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `role` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "role" SET DATA TYPE VARCHAR(9);
