/*
  Warnings:

  - The `dateTime` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "dateTime",
ADD COLUMN     "dateTime" TIMESTAMP(3);
