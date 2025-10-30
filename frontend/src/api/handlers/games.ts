import axios from "axios";
import type {
    iGame,
    iGameResponse,
    iGamesResponse,
    iGameWeeklyStat,
    iWeeklyGamesStatsResponse,
    iWeeklyGameStatsResponse,
} from "../../interfaces/game";
import { throwApiError } from "../errorHandler/handleApiErrors";
import type { ApiSuccess } from "../../interfaces/response";

const BASE_URL = "http://localhost:1338/games";

const getGames = async (normalizedTitle?: string): Promise<iGame[]> => {
    const response = await axios.get<iGamesResponse>(BASE_URL, {
        params: normalizedTitle ? { normalizedTitle } : undefined,
        validateStatus: () => true,
    });
    const result = response.data;
    if (!result.success) {
        console.error("getGames API error:", result.message);
        throwApiError(result.message, response.status);
    }
    return (result as ApiSuccess<iGame[]>).data;
};

const getGame = async (id: number): Promise<iGame> => {
    if (!id || Number.isNaN(id)) throw new Error("Invalid gameId.");
    const response = await axios.get<iGameResponse>(`${BASE_URL}/${id}`, {
        validateStatus: () => true,
    });

    const result = response.data;
    if (!result.success) {
        console.error("getGame API error:", result.message);
        throwApiError(result.message, response.status);
    }

    return (result as ApiSuccess<iGame>).data;
};
const getWeeklyGameStats = async (id: number): Promise<iGameWeeklyStat> => {
    if (!id || Number.isNaN(id)) throw new Error("Invalid gameId.");
    const response = await axios.get<iWeeklyGameStatsResponse>(`${BASE_URL}/weekly/stats/${id}`, {
        validateStatus: () => true,
    });

    const result = response.data;
    if (!result.success) {
        console.error("getWeeklyGameStats API error:", result.message);
        throwApiError(result.message, response.status);
    }

    return (result as ApiSuccess<iGameWeeklyStat>).data;
};

const getWeeklyGamesStats = async (): Promise<iGameWeeklyStat[]> => {
    const response = await axios.get<iWeeklyGamesStatsResponse>(`${BASE_URL}/weekly/stats/`, {
        validateStatus: () => true,
    });

    const result = response.data;
    if (!result.success) {
        console.error("getWeeklyGamesStats API error:", result.message);
        throwApiError(result.message, response.status);
    }

    return (result as ApiSuccess<iGameWeeklyStat[]>).data;
};

export { getGames, getGame, getWeeklyGameStats, getWeeklyGamesStats };
