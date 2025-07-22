/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Token` table. All the data in the column will be lost.
  - Added the required column `expiredAt` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Token_token_key";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "expiresAt",
DROP COLUMN "token",
ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL;
