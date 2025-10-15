import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/responses/handleSuccessResponse.ts";
import { handleError } from "../utils/responses/handleErrorResponse.ts";

const prisma = new PrismaClient();

export const getGames = async (req: Request, res: Response) => {
    try {
        // TODO: replace with real DB query, e.g. `await prisma.game.findMany()` once you have a Game model
        const games: unknown[] = []; // placeholder until your Prisma model exists
        return sendSuccessResponse(res, "Fetched games", games);
    } catch (error) {
        return handleError(error, res);
    }
};
