/*
  Warnings:

  - The values [TEMPORARY] on the enum `AddressType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AddressType_new" AS ENUM ('PERMANENT', 'CORRESPONDENCE');
ALTER TABLE "Address" ALTER COLUMN "addressType" TYPE "AddressType_new" USING ("addressType"::text::"AddressType_new");
ALTER TYPE "AddressType" RENAME TO "AddressType_old";
ALTER TYPE "AddressType_new" RENAME TO "AddressType";
DROP TYPE "AddressType_old";
COMMIT;
