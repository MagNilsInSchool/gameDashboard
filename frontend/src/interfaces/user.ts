import type { ApiResponse } from "./response";

export type iUsersResponse = ApiResponse<iUser[]>;
export type iUserResponse = ApiResponse<iUser>;

export interface iUser {
    id: number;
    firstName: string;
    lastName: string;
    normalizedName: string;
    email: string;
    image?: string | null;
    stats?: iUserStats[];
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

interface iUserStats {
    gameId: number;
    title: string;
    totalTimePlayed: number;
    numberOfPlays: number;
}
