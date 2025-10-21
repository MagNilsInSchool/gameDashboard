import type { iGame } from "./game";
import type { ApiResponse } from "./response";
import type { iUser } from "./user";

export type iGameStatsResponse = ApiResponse<iGameStat[]>;
export type iGameStatResponse = ApiResponse<iGameStat>;

export interface iGameStat {
    id: Number;
    timePlayed?: Number;
    game: iGame;
    gameId: Number;
    user: iUser;
    userId: Number;
    isEnded: Boolean;
    createdAt: Date;
    endedAt?: Date;
    updatedAt: Date;
}
