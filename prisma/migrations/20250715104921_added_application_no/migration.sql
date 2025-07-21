/*
  Warnings:

  - The values [BHUBANESHWAR,AHEMBADABAD] on the enum `ExamCenterName` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[applicationNo]` on the table `JobPost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicationNo` to the `JobPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExamCenterName_new" AS ENUM ('DELHI_NCR', 'BHUBANESWAR', 'AHMEDABAD', 'KOLKATA', 'HARYANA');
ALTER TABLE "ExaminationPreference" ALTER COLUMN "examCenterName" TYPE "ExamCenterName_new" USING ("examCenterName"::text::"ExamCenterName_new");
ALTER TYPE "ExamCenterName" RENAME TO "ExamCenterName_old";
ALTER TYPE "ExamCenterName_new" RENAME TO "ExamCenterName";
DROP TYPE "ExamCenterName_old";
COMMIT;

-- AlterTable
ALTER TABLE "JobPost" ADD COLUMN     "applicationNo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JobPost_applicationNo_key" ON "JobPost"("applicationNo");
