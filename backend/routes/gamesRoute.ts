import { Router } from "express";
import { createGame, deleteGame, getGame, getGames, updateGame } from "../handlers/gamesHandler.ts";

export const gamesRoute = Router();

gamesRoute.get("/", getGames);
gamesRoute.post("/", createGame);

// Param routes.
gamesRoute.get("/:id", getGame);
gamesRoute.delete("/:id", deleteGame);
gamesRoute.put("/:id", updateGame);
