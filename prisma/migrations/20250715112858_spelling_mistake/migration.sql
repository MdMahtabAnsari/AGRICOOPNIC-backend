/*
  Warnings:

  - You are about to drop the column `aadhar` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[aadhaar]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aadhaar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_aadhar_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "aadhar",
ADD COLUMN     "aadhaar" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_aadhaar_key" ON "User"("aadhaar");
