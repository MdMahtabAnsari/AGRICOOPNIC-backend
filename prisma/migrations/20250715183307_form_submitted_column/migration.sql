-- CreateTable
CREATE TABLE "FormSubmitted" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "submissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FormSubmitted_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormSubmitted_userId_key" ON "FormSubmitted"("userId");

-- AddForeignKey
ALTER TABLE "FormSubmitted" ADD CONSTRAINT "FormSubmitted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
