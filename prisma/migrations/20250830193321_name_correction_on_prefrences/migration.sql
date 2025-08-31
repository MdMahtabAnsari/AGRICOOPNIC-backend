/*
  Warnings:

  - The values [BANGLORE] on the enum `ExamCenterName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExamCenterName_new" AS ENUM ('DELHI_NCR', 'LUCKNOW', 'AHMEDABAD', 'BHOPAL', 'MUMBAI', 'KOLKATA', 'BHUBANESWAR', 'RANCHI', 'PATNA', 'BANGALORE');
ALTER TABLE "ExaminationPreference" ALTER COLUMN "examCenterName" TYPE "ExamCenterName_new" USING ("examCenterName"::text::"ExamCenterName_new");
ALTER TYPE "ExamCenterName" RENAME TO "ExamCenterName_old";
ALTER TYPE "ExamCenterName_new" RENAME TO "ExamCenterName";
DROP TYPE "ExamCenterName_old";
COMMIT;
