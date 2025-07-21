/*
  Warnings:

  - A unique constraint covering the columns `[userId,step]` on the table `FormProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FormProgress_userId_step_key" ON "FormProgress"("userId", "step");
