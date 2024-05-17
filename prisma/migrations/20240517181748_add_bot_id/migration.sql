/*
  Warnings:

  - Added the required column `botId` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "botId" TEXT NOT NULL;
