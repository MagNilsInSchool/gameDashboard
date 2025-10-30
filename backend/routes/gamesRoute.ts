import { Router } from "express";
import {
    createGame,
    deleteGame,
    getGame,
    getGames,
    getWeeklyGamesStats,
    updateGame,
} from "../handlers/gamesHandler.ts";

export const gamesRoute = Router();

gamesRoute.get("/", getGames);
gamesRoute.post("/", createGame);
gamesRoute.get("/weekly/stats/", getWeeklyGamesStats);

//! Param routes.
gamesRoute.get("/:id", getGame);
// gamesRoute.get("/weekly/stats/:id", getWeeklyGameStats);
gamesRoute.delete("/:id", deleteGame);
gamesRoute.put("/:id", updateGame);
