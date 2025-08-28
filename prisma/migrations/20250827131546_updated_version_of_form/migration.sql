/*
  Warnings:

  - The values [PWBD] on the enum `CategoryType` will be removed. If these variants are still used in the database, this will fail.
  - The values [HARYANA] on the enum `ExamCenterName` will be removed. If these variants are still used in the database, this will fail.
  - The values [ASSISTANT_BRANCH_MANAGER,RELATIONSHIP_MANAGER,MULTITASKING_STAFF,BLOCK_SUPERVISOR] on the enum `JobPostName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategoryType_new" AS ENUM ('GENERAL', 'EWS_OR_OBC', 'SC_OR_ST');
ALTER TABLE "Category" ALTER COLUMN "categoryType" TYPE "CategoryType_new" USING ("categoryType"::text::"CategoryType_new");
ALTER TABLE "Fees" ALTER COLUMN "categoryType" TYPE "CategoryType_new" USING ("categoryType"::text::"CategoryType_new");
ALTER TABLE "Payment" ALTER COLUMN "category" TYPE "CategoryType_new" USING ("category"::text::"CategoryType_new");
ALTER TYPE "CategoryType" RENAME TO "CategoryType_old";
ALTER TYPE "CategoryType_new" RENAME TO "CategoryType";
DROP TYPE "CategoryType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ExamCenterName_new" AS ENUM ('DELHI_NCR', 'LUCKNOW', 'AHMEDABAD', 'BHOPAL', 'MUMBAI', 'KOLKATA', 'BHUBANESWAR', 'RANCHI', 'PATNA', 'BANGLORE');
ALTER TABLE "ExaminationPreference" ALTER COLUMN "examCenterName" TYPE "ExamCenterName_new" USING ("examCenterName"::text::"ExamCenterName_new");
ALTER TYPE "ExamCenterName" RENAME TO "ExamCenterName_old";
ALTER TYPE "ExamCenterName_new" RENAME TO "ExamCenterName";
DROP TYPE "ExamCenterName_old";
COMMIT;

-- AlterEnum
ALTER TYPE "ExaminationPreferenceType" ADD VALUE 'PREFERENCE_3';

-- AlterEnum
BEGIN;
CREATE TYPE "JobPostName_new" AS ENUM ('MTS', 'SUPERVISOR', 'CLERK', 'ASSISTANT_AGRICULTURE_OFFICER', 'AGRICULTURE_OFFICER', 'FIELD_OFFICER');
ALTER TABLE "JobPost" ALTER COLUMN "name" TYPE "JobPostName_new" USING ("name"::text::"JobPostName_new");
ALTER TYPE "JobPostName" RENAME TO "JobPostName_old";
ALTER TYPE "JobPostName_new" RENAME TO "JobPostName";
DROP TYPE "JobPostName_old";
COMMIT;
