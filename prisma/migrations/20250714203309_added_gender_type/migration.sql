/*
  Warnings:

  - Changed the type of `gender` on the `PersonalDetail` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "PersonalDetail" DROP COLUMN "gender",
ADD COLUMN     "gender" "GenderType" NOT NULL;
