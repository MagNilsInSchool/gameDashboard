import axios from "axios";
import type {
    iGameStat,
    iGameStatResponse,
    iWeeklyAverageResponse,
    iWeeklyAverages,
    iWeeklyLeaderBoardEntry,
    iWeeklyLeaderBoardResponse,
} from "../../interfaces/gameStat";
import type { ApiSuccess } from "../../interfaces/response";
import { throwApiError } from "../errorHandler/handleApiErrors";
import { sessionCreationSchema, type iSessionCreation } from "../../schemas/sessionSchemas";

const BASE_URL = "http://localhost:1338/gamestats";

const startSession = async (body: iSessionCreation): Promise<iGameStat> => {
    const validatedSessionIds = sessionCreationSchema.safeParse(body);
    if (!validatedSessionIds.success) throw validatedSessionIds.error;
    const response = await axios.post<iGameStatResponse>(BASE_URL, validatedSessionIds.data, {
        validateStatus: () => true,
    });

    const result = response.data;
    if (!result.success) {
        console.error("startSession API error:", result.message);
        throwApiError(result.message, response.status);
    }
    return (result as ApiSuccess<iGameStat>).data;
};

const endSession = async (id: number): Promise<iGameStat> => {
    if (!id || Number.isNaN(id)) throwApiError("Invalid id.", 400);
    // const validatedSessionIds = sessionCreationSchema.safeParse(body);
    // if (!validatedSessionIds.success) throw validatedSessionIds.error;
    const response = await axios.patch<iGameStatResponse>(`${BASE_URL}/${id}`, {
        validateStatus: () => true,
    });

    const result = response.data;
    if (!result.success) {
        console.error("endSession API error:", result.message);
        throwApiError(result.message, response.status);
    }
    return (result as ApiSuccess<iGameStat>).data;
};

const getSevenDayAverage = async (): Promise<iWeeklyAverages[]> => {
    const response = await axios.get<iWeeklyAverageResponse>(`${BASE_URL}/weekly/averages`, {
        validateStatus: () => true,
    });
    const result = response.data;
    if (!result.success) {
        console.error("getSevenDayAverage API error:", result.message);
        throwApiError(result.message, response.status);
    }
    return (result as ApiSuccess<iWeeklyAverages[]>).data;
};

const getWeeklyLeaderBoard = async (): Promise<iWeeklyLeaderBoardEntry[]> => {
    const response = await axios.get<iWeeklyLeaderBoardResponse>(`${BASE_URL}/weekly/leaderboard`, {
        validateStatus: () => true,
    });
    const result = response.data;
    if (!result.success) {
        console.error("getWeeklyLeaderBoard API error:", result.message);
        throwApiError(result.message, response.status);
    }
    return (result as ApiSuccess<iWeeklyLeaderBoardEntry[]>).data;
};
export { startSession, endSession, getSevenDayAverage, getWeeklyLeaderBoard };
