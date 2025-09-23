/*
  Warnings:

  - You are about to drop the column `branch` on the `Bank` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Bank` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Bank" DROP COLUMN "branch",
DROP COLUMN "name";
