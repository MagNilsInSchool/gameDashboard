import { type Game, Prisma, PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/responses/handleSuccessResponse.ts";
import { CustomError, handleError } from "../utils/responses/handleErrorResponse.ts";
import { postGresIdSchema } from "../schemas/postgresIdSchema.ts";
import { gameCreationSchema, gameFilterSchema } from "../schemas/gamesSchema.ts";

const prisma = new PrismaClient();

export const getGames = async (req: Request, res: Response) => {
    try {
        const validatedGamesFilter = gameFilterSchema.safeParse(req.query);
        if (!validatedGamesFilter.success) throw validatedGamesFilter.error;

        const where: Prisma.GameWhereInput = {};

        let notFoundMessage = "No games found.";

        if (validatedGamesFilter.data.normalizedTitle) {
            where.normalizedTitle = {
                contains: validatedGamesFilter.data.normalizedTitle,
                mode: "insensitive",
            };
            notFoundMessage = `No game matches your query '${validatedGamesFilter.data.normalizedTitle}'.`;
        }

        const games: Game[] = await prisma.game.findMany({ where, include: { stats: true }, orderBy: { id: "asc" } });
        if (games.length === 0) throw new CustomError(notFoundMessage, 404);

        return sendSuccessResponse(res, "Fetched games successfully.", games);
    } catch (error) {
        return handleError(error, res);
    }
};

export const getGame = async (req: Request, res: Response) => {
    try {
        const validatedId = postGresIdSchema.safeParse(req.params);
        if (!validatedId.success) throw validatedId.error;

        const game: Game | null = await prisma.game.findUnique({
            where: { id: validatedId.data.id },
            include: { stats: true },
        });
        if (!game) throw new CustomError(`Game with id: ${validatedId.data.id} not found!`, 404);

        return sendSuccessResponse(res, "Fetched game successfully.", game);
    } catch (error) {
        return handleError(error, res);
    }
};

export const createGame = async (req: Request, res: Response) => {
    try {
        const validatedGame = gameCreationSchema.safeParse(req.body);
        if (!validatedGame.success) throw validatedGame.error;
        const { title } = validatedGame.data;
        const newGame = {
            title: title.trim(),
            normalizedTitle: title.trim().toLowerCase(),
        };
        const game: Game = await prisma.game.create({ data: newGame });
        return sendSuccessResponse(res, "Game created successfully.", game);
    } catch (error) {
        return handleError(error, res);
    }
};

export const deleteGame = async (req: Request, res: Response) => {
    try {
        const validatedId = postGresIdSchema.safeParse(req.params);
        if (!validatedId.success) throw validatedId.error;
        const game: Game | null = await prisma.game.delete({ where: { id: validatedId.data.id } });
        return sendSuccessResponse(res, "Game deleted successfully.", game);
    } catch (error) {
        return handleError(error, res);
    }
};

export const updateGame = async (req: Request, res: Response) => {
    try {
        const validatedId = postGresIdSchema.safeParse(req.params);
        if (!validatedId.success) throw validatedId.error;

        const validatedGameUpdate = gameCreationSchema.safeParse(req.body);
        if (!validatedGameUpdate.success) throw validatedGameUpdate.error;

        const updatedGame: Game = await prisma.game.update({
            where: { id: validatedId.data.id },
            data: {
                title: validatedGameUpdate.data.title.trim(),
                normalizedTitle: validatedGameUpdate.data.title.trim().toLowerCase(),
            },
        });
        return sendSuccessResponse(res, "Game updated successfully.", updatedGame);
    } catch (error) {
        return handleError(error, res);
    }
};
