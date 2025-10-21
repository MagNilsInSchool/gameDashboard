-- AlterTable
ALTER TABLE "GameStat" ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "isEnded" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "timePlayed" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Game_normalizedTitle_idx" ON "Game"("normalizedTitle");

-- CreateIndex
CREATE INDEX "GameStat_userId_idx" ON "GameStat"("userId");

-- CreateIndex
CREATE INDEX "GameStat_gameId_idx" ON "GameStat"("gameId");

-- CreateIndex
CREATE INDEX "GameStat_isEnded_idx" ON "GameStat"("isEnded");

-- CreateIndex
CREATE INDEX "User_normalizedName_idx" ON "User"("normalizedName");
