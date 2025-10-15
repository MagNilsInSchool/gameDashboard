import { Router } from "express";
import { getGames } from "../handlers/gamesHandler.ts";

export const gamesRoute = Router();

gamesRoute.get("/", getGames);
