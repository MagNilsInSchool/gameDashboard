import axios from "axios";
import type { iGame, iGameResponse, iGamesResponse } from "../../interfaces/game";

const BASE_URL = "http://localhost:1338/games";

const getGames = async (normalizedTitle?: string): Promise<iGame[] | null> => {
    try {
        const response = await axios.get<iGamesResponse>(BASE_URL, {
            params: normalizedTitle ? { normalizedTitle } : undefined,
        });
        const result = response.data;
        if (!result.success) {
            console.error("API error:", result.message);
            return null;
        }
        return result.data;
    } catch (error) {
        console.error("Request failed:", error);
        return null;
    }
};

const getGame = async (id: number): Promise<iGame | null> => {
    try {
        if (!id || Number.isNaN(id)) return null;
        const response = await axios.get<iGameResponse>(`${BASE_URL}/${id}`);
        const result = response.data;
        if (!result.success) {
            console.error("API error:", result.message);
            return null;
        }
        return result.data;
    } catch (error) {
        console.error("Request failed:", error);
        return null;
    }
};
export { getGames, getGame };
