import type { iGameStat } from "./gameStat";
import type { ApiResponse } from "./response";

export type iGamesResponse = ApiResponse<iGame[]>;
export type iGameResponse = ApiResponse<iGame>;
export type iWeeklyGameStatsResponse = ApiResponse<iGameWeeklyStat>;
export type iWeeklyGamesStatsResponse = ApiResponse<iGameWeeklyStat[]>;
export interface iGame {
    id: number;
    title: string;
    normalizedTitle: string;
    image?: string;
    stats?: iGameStat[];
    createdAt?: Date;
    updatedAt?: Date;
}
interface iWeeklyUserStats {
    userId: number;
    name: string;
    count: number;
    totalPlayed: number;
    sessions: iGameSession[];
}
interface iGameSession {
    timePlayed: number;
    endedAt: Date;
}
export interface iGameWeeklyStat {
    id: number;
    title: string;
    totalPlayed: number;
    count: number;
    stats: iWeeklyUserStats[];
}
