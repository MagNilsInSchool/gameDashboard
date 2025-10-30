import { Prisma, PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/responses/handleSuccessResponse.ts";
import { CustomError, handleError } from "../utils/responses/handleErrorResponse.ts";
import { postGresIdSchema } from "../schemas/postgresIdSchema.ts";
import { gameStatCreationSchema, gameStatFilterSchema } from "../schemas/gameStatSchema.ts";

const prisma = new PrismaClient();

// @desc: GET fetch all gamesessions.
// @query: Optional filtering on gameId and or userId.
// @route /gamestats
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

// @desc: GET fetch specific gamesession.
// @params: id of session.
// @route /gamestats/:id
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

// @desc: DELETE specific gamesession.
// @params: id of session.
// @route /gamestats/:id
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

// @desc: POST create gamesession. Done in transaction to make sure both game and user exist. If user already has an active session it is ended before creating a new session.
// @body: gameId and userId.
// @route /gamestats
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

//! If .env has DEV_MODE="true" then seconds are multiplied by 60.
// @desc: PATCH ends active gamesession. Makes sure session exists and isn't already ended. timePlayed is then the difference between endedAt and createdAt in seconds.
// @params: sessionId
// @route /gamestats/:id
export const endGameSession = async (req: Request, res: Response) => {
    try {
        const validatedId = postGresIdSchema.safeParse(req.params);
        if (!validatedId.success) throw validatedId.error;
        const id = validatedId.data.id;
        const isDevelopment = process.env.DEV_MODE === "true";
        const now = new Date();

        const endedSession = await prisma.$transaction(async (prismaTx) => {
            const session = await prismaTx.gameStat.findUnique({ where: { id } });

            if (!session) throw new CustomError(`No session with id: ${id}`, 404);
            if (session.isEnded) throw new CustomError(`Session is already ended`, 400);

            let seconds = Math.floor((now.getTime() - session.createdAt.getTime()) / 1000);

            if (isDevelopment) seconds = seconds * 60;

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

// export const getWeeklyStats = async (req: Request, res: Response) => {
//     try {
//         const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

//         const where: Prisma.GameStatWhereInput = {
//             isEnded: true,
//             OR: [{ createdAt: { gte: oneWeekAgo } }, { endedAt: { gte: oneWeekAgo } }],
//         };

//         const gameStats = await prisma.gameStat.findMany({
//             where,
//             orderBy: { id: "asc" },
//             select: {
//                 game: { select: { title: true, id: true } },
//                 timePlayed: true,
//             },
//         });

//         if (gameStats.length === 0) throw new CustomError("No games were played this 7 day period", 404);

//         const aggMap = new Map<number, { gameId: number; title: string; totalTime: number }>();

//         for (const s of gameStats) {
//             const gameId = s.game.id;
//             const title = s.game.title ?? "Unknown";
//             const totalTime = s.timePlayed ?? 0;

//             const existing = aggMap.get(gameId);
//             if (existing) {
//                 existing.totalTime += totalTime;
//             } else {
//                 aggMap.set(gameId, { gameId, title, totalTime });
//             }
//         }

//         const sevenDayAverage = Array.from(aggMap.values())
//             .map(({ gameId, title, totalTime }) => ({
//                 gameId,
//                 title,
//                 dayAverage: Math.round(totalTime / 7),
//             }))
//             .sort((a, b) => b.dayAverage - a.dayAverage);

//         return sendSuccessResponse(res, "Fetched sevenDayAverage successfully.", sevenDayAverage);
//     } catch (error) {
//         return handleError(error, res);
//     }
// };

// export const getWeeklyLeaderBoard = async (req: Request, res: Response) => {
//     try {
//         const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

//         const where: Prisma.GameStatWhereInput = {
//             isEnded: true,
//             OR: [{ createdAt: { gte: oneWeekAgo } }, { endedAt: { gte: oneWeekAgo } }],
//         };

//         const gameStats = await prisma.gameStat.findMany({
//             where,
//             orderBy: { id: "asc" },
//             select: {
//                 game: { select: { title: true, id: true } },
//                 userId: true,
//                 user: { select: { firstName: true, lastName: true } },
//                 timePlayed: true,
//             },
//         });

//         if (gameStats.length === 0) throw new CustomError("No games were played this 7 day period", 404);

//         const perGamePerUser = new Map<
//             number,
//             Map<number, { userId: number; user: string; title: string; totalTime: number }>
//         >();

//         for (const s of gameStats) {
//             const gameId = s.game.id;
//             const userId = s.userId;
//             const title = s.game.title ?? "Unknown";
//             const totalTime = s.timePlayed ?? 0;

//             const user = s.user.firstName && s.user.lastName ? `${s.user.firstName} ${s.user.lastName}` : "Unknown";

//             const existingGame = perGamePerUser.get(gameId);
//             if (existingGame) {
//                 const existingUserGameSession = existingGame.get(userId);
//                 if (existingUserGameSession) {
//                     existingUserGameSession.totalTime += totalTime;
//                     existingGame.set(userId, existingUserGameSession);
//                 } else {
//                     existingGame.set(userId, { userId, user, title, totalTime });
//                 }
//             } else {
//                 const userMap = new Map<number, { userId: number; user: string; title: string; totalTime: number }>();
//                 userMap.set(userId, { userId, user, title, totalTime });
//                 perGamePerUser.set(gameId, userMap);
//             }
//         }

//         const totalPerPlayerPerGame = Array.from(perGamePerUser.entries()).map(([gameId, userMap]) => ({
//             gameId,
//             players: Array.from(userMap.values()).sort((a, b) => b.totalTime - a.totalTime),
//         }));

//         const topPlayerPerGame = totalPerPlayerPerGame.map((gp) => ({
//             gameId: gp.gameId ?? null,
//             game: gp.players[0].title ?? null,
//             user: gp.players[0].user ?? null,
//             played: gp.players[0].totalTime ?? null,
//         }));

//         return sendSuccessResponse(res, "Fetched leaderboard successfully.", topPlayerPerGame);
//     } catch (error) {
//         return handleError(error, res);
//     }
// };
