import { Router } from "express";
import {
    createGameStat,
    deleteGameStat,
    endGameSession,
    getGamesStats,
    getGameStat,
    getWeeklyLeaderBoard,
    getWeeklyStats,
} from "../handlers/gamestatsHandler.ts";

export const gamesStatsRoute = Router();

gamesStatsRoute.get("/", getGamesStats);
gamesStatsRoute.get("/weekly/averages", getWeeklyStats);
gamesStatsRoute.get("/weekly/leaderboard", getWeeklyLeaderBoard);
gamesStatsRoute.post("/", createGameStat);

// Param routes.
gamesStatsRoute.get("/:id", getGameStat);
gamesStatsRoute.delete("/:id", deleteGameStat);
gamesStatsRoute.patch("/:id", endGameSession);
