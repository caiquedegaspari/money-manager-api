/*
  Warnings:

  - Made the column `monthlyIncome` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "monthlyIncome" SET NOT NULL;
