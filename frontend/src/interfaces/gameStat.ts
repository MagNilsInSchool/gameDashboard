import type { iGame } from "./game";
import type { ApiResponse } from "./response";
import type { iUser } from "./user";

export type iGameStatsResponse = ApiResponse<iGameStat[]>;
export type iGameStatResponse = ApiResponse<iGameStat>;
export type iWeeklyAverageResponse = ApiResponse<iWeeklyAverages[]>;
export type iWeeklyLeaderBoardResponse = ApiResponse<iWeeklyLeaderBoardEntry[]>;

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

export interface iWeeklyAverages {
    gameId: number;
    title: string;
    dayAverage: number;
}
export interface iWeeklyLeaderBoardEntry {
    gameId: number;
    game: string;
    user: string;
    played: number;
}
