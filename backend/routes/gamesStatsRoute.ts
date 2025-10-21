import { Router } from "express";
import {
    createGameStat,
    deleteGameStat,
    endGameSession,
    getGamesStats,
    getGameStat,
} from "../handlers/gamestatsHandler.ts";

export const gamesStatsRoute = Router();

gamesStatsRoute.get("/", getGamesStats);
gamesStatsRoute.post("/", createGameStat);

// Param routes.
gamesStatsRoute.get("/:id", getGameStat);
gamesStatsRoute.delete("/:id", deleteGameStat);
gamesStatsRoute.patch("/:id", endGameSession);
