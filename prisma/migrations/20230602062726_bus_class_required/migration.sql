/*
  Warnings:

  - Made the column `classId` on table `Bus` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Bus" DROP CONSTRAINT "Bus_classId_fkey";

-- AlterTable
ALTER TABLE "Bus" ALTER COLUMN "classId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
