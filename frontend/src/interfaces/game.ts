import type { iGameStat } from "./gameStat";
import type { ApiResponse } from "./response";

export type iGamesResponse = ApiResponse<iGame[]>;
export type iGameResponse = ApiResponse<iGame>;

export interface iGame {
    id: number;
    title: string;
    normalizedTitle: string;
    image?: string;
    stats?: iGameStat[];
    createdAt?: Date;
    updatedAt?: Date;
}
