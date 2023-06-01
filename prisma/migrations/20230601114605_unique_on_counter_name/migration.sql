/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Counter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Counter_name_key" ON "Counter"("name");
