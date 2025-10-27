import { Prisma, PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/responses/handleSuccessResponse.ts";
import { CustomError, handleError } from "../utils/responses/handleErrorResponse.ts";
import { postGresIdSchema } from "../schemas/postgresIdSchema.ts";
import { gameStatCreationSchema, gameStatFilterSchema } from "../schemas/gameStatSchema.ts";

const prisma = new PrismaClient();

export const getGamesStats = async (req: Request, res: Response) => {
    try {
        const validatedGameStatFilter = gameStatFilterSchema.safeParse(req.query);
        if (!validatedGameStatFilter.success) throw validatedGameStatFilter.error;

        const where: Prisma.GameStatWhereInput = {};
        let notFoundMessage = "No gamestats found.";
        const data = validatedGameStatFilter.data;
        if (data) {
            if (data.gameId && data.userId) {
                where.userId = data.userId;
                where.gameId = data.gameId;

                notFoundMessage = `No stat match your query: userId: '${data.userId}', gameId: '${data.gameId}'.`;
            } else {
                if (data.userId) {
                    where.userId = data.userId;
                    notFoundMessage = `No stat match your userId query: '${data.userId}'.`;
                }
                if (data.gameId) {
                    where.userId = data.gameId;
                    notFoundMessage = `No stat match your gameId query: '${data.gameId}'.`;
                }
            }
        }

        const gameStats = await prisma.gameStat.findMany({
            where,
            orderBy: { id: "asc" },
            select: {
                id: true,
                game: { select: { title: true } },
                gameId: true,
                user: { select: { firstName: true, lastName: true } },
                userId: true,
                timePlayed: true,
                isEnded: true,
                endedAt: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (gameStats.length === 0) throw new CustomError(notFoundMessage, 404);

        const formattedGameStats = gameStats.map((gameStat) => ({
            ...gameStat,
            game: gameStat.game.title,
        }));
        return sendSuccessResponse(res, "Fetched gameStats successfully.", formattedGameStats);
    } catch (error) {
        return handleError(error, res);
    }
};

export const getGameStat = async (req: Request, res: Response) => {
    try {
        const validatedId = postGresIdSchema.safeParse(req.params);
        if (!validatedId.success) throw validatedId.error;

        const gameStat = await prisma.gameStat.findUnique({
            where: { id: validatedId.data.id },
            select: {
                id: true,
                game: { select: { title: true } },
                user: { select: { normalizedName: true } },
                timePlayed: true,
                isEnded: true,
                endedAt: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!gameStat) throw new CustomError(`GameStat with id: ${validatedId.data.id} not found!`, 404);
        const formattedGameStat = {
            ...gameStat,
            game: gameStat.game.title,
            user: gameStat.user.normalizedName,
        };
        return sendSuccessResponse(res, "Fetched GameStat successfully.", formattedGameStat);
    } catch (error) {
        return handleError(error, res);
    }
};

export const deleteGameStat = async (req: Request, res: Response) => {
    try {
        const validatedId = postGresIdSchema.safeParse(req.params);
        if (!validatedId.success) throw validatedId.error;

        const gameStat = await prisma.gameStat.delete({
            where: { id: validatedId.data.id },
            select: {
                id: true,
                game: { select: { title: true } },
                user: { select: { normalizedName: true } },
                timePlayed: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!gameStat) throw new CustomError(`GameStat with id: ${validatedId.data.id} not found!`, 404);
        const formattedGameStat = {
            ...gameStat,
            game: gameStat.game.title,
            user: gameStat.user.normalizedName,
        };
        return sendSuccessResponse(res, "Deleted GameStat successfully.", formattedGameStat);
    } catch (error) {
        return handleError(error, res);
    }
};

export const createGameStat = async (req: Request, res: Response) => {
    try {
        const validatedGameStat = gameStatCreationSchema.safeParse(req.body);
        if (!validatedGameStat.success) throw validatedGameStat.error;
        const { gameId, userId } = validatedGameStat.data;

        const gameStatCreation = await prisma.$transaction(async (prismaTx) => {
            const user = await prismaTx.user.findUnique({ where: { id: userId } });
            if (!user) throw new CustomError(`No user with id: ${userId}`, 404);
            const game = await prismaTx.game.findUnique({ where: { id: gameId } });
            if (!game) throw new CustomError(`No game with id: ${gameId}`, 404);

            const now = new Date();
            const activeSessions = await prismaTx.gameStat.findMany({ where: { userId, isEnded: false } });

            for (const session of activeSessions) {
                const seconds = Math.floor((now.getTime() - session.createdAt.getTime()) / 1000);
                await prismaTx.gameStat.update({
                    where: { id: session.id },
                    data: { endedAt: now, isEnded: true, timePlayed: seconds },
                });
            }
            const newStat = {
                gameId,
                userId,
            };

            const gameStat = await prismaTx.gameStat.create({
                data: newStat,
                include: { game: { select: { title: true } }, user: { select: { firstName: true, lastName: true } } },
            });

            const formattedSession = {
                ...gameStat,
                game: gameStat.game.title,
                user: `${gameStat.user.firstName} ${gameStat.user.lastName}`,
            };

            return formattedSession;
        });

        return sendSuccessResponse(res, "Created GameStat successfully.", gameStatCreation);
    } catch (error) {
        return handleError(error, res);
    }
};

export const endGameSession = async (req: Request, res: Response) => {
    try {
        const validatedId = postGresIdSchema.safeParse(req.params);
        if (!validatedId.success) throw validatedId.error;
        const id = validatedId.data.id;

        const now = new Date();

        const endedSession = await prisma.$transaction(async (prismaTx) => {
            const session = await prismaTx.gameStat.findUnique({ where: { id } });

            if (!session) throw new CustomError(`No session with id: ${id}`, 404);
            if (session.isEnded) throw new CustomError(`Session is already ended`, 400);

            const seconds = Math.floor((now.getTime() - session.createdAt.getTime()) / 1000);

            const sessionToEnd = await prismaTx.gameStat.update({
                where: { id },
                data: { isEnded: true, endedAt: now, timePlayed: seconds },
                include: { game: { select: { title: true } }, user: { select: { firstName: true, lastName: true } } },
            });
            const formattedSession = {
                ...sessionToEnd,
                game: sessionToEnd.game.title,
                user: `${sessionToEnd.user.firstName} ${sessionToEnd.user.lastName}`,
            };

            return formattedSession;
        });

        return sendSuccessResponse(res, "Ended session successfully.", endedSession);
    } catch (error) {
        return handleError(error, res);
    }
};
