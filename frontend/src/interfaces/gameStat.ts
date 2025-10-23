import type { iGame } from "./game";
import type { ApiResponse } from "./response";
import type { iUser } from "./user";

export type iGameStatsResponse = ApiResponse<iGameStat[]>;
export type iGameStatResponse = ApiResponse<iGameStat>;

export interface iGameStat {
    id: number;
    timePlayed?: number;
    game: iGame;
    gameId: number;
    user: iUser;
    userId: number;
    isEnded: boolean;
    createdAt: Date;
    endedAt?: Date;
    updatedAt: Date;
}
