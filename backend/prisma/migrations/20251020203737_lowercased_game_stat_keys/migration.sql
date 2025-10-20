/*
  Warnings:

  - A unique constraint covering the columns `[normalizedTitle]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Game_normalizedTitle_key" ON "Game"("normalizedTitle");
