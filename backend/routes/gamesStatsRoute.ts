import { Router } from "express";
import {
    createGameStat,
    deleteGameStat,
    getGamesStats,
    getGameStat,
    updateGameStat,
} from "../handlers/gamestatsHandler.ts";

export const gamesStatsRoute = Router();

gamesStatsRoute.get("/", getGamesStats);
gamesStatsRoute.post("/", createGameStat);

// Param routes.
gamesStatsRoute.get("/:id", getGameStat);
gamesStatsRoute.delete("/:id", deleteGameStat);
gamesStatsRoute.put("/:id", updateGameStat);
