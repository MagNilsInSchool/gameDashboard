import { Prisma, PrismaClient, type User } from "@prisma/client";
import type { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/responses/handleSuccessResponse.ts";
import { CustomError, handleError } from "../utils/responses/handleErrorResponse.ts";
import { type iUserUpdate, userCreationSchema, userFilterSchema, userUpdateSchema } from "../schemas/usersSchema.ts";
import { normalizedUserName } from "../utils/index.ts";
import { postGresIdSchema } from "../schemas/postgresIdSchema.ts";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const validatedUserFilter = userFilterSchema.safeParse(req.query);
        if (!validatedUserFilter.success) throw validatedUserFilter.error;

        const where: Prisma.UserWhereInput = {};

        let notFoundMessage = "No users found.";

        if (validatedUserFilter.data.normalizedName) {
            where.normalizedName = {
                contains: validatedUserFilter.data.normalizedName,
                mode: "insensitive",
            };
            notFoundMessage = `No user match your query: '${validatedUserFilter.data.normalizedName}'.`;
        }

        const users = await prisma.user.findMany({
            where,
            orderBy: { id: "asc" },
            include: { stats: { include: { game: { select: { id: true, title: true } } } } },
        });

        if (users.length === 0) throw new CustomError(notFoundMessage, 404);

        const formattedUsers = users.map((user) => ({
            ...user,
            stats: user.stats.map((s) => ({
                id: s.id,
                timePlayed: s.timePlayed,
                gameId: s.gameId,
                gameTitle: s.game.title,
                createdAt: s.createdAt,
            })),
        }));

        return sendSuccessResponse(res, "Fetched users successfully.", formattedUsers);
    } catch (error) {
        return handleError(error, res);
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const validatedId = postGresIdSchema.safeParse(req.params);
        if (!validatedId.success) throw validatedId.error;

        const user = await prisma.user.findUnique({
            where: { id: validatedId.data.id },
            include: { stats: { include: { game: { select: { id: true, title: true } } } } },
        });
        if (!user) throw new CustomError(`User with id: ${validatedId.data.id} not found!`, 404);

        const formattedUser = {
            ...user,
            stats: user.stats.map((s) => ({
                id: s.id,
                timePlayed: s.timePlayed,
                gameId: s.gameId,
                gameTitle: s.game.title,
                createdAt: s.createdAt,
            })),
        };

        return sendSuccessResponse(res, "Fetched user successfully.", formattedUser);
    } catch (error) {
        return handleError(error, res);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const validatedId = postGresIdSchema.safeParse(req.params);
        if (!validatedId.success) throw validatedId.error;

        const user: User | null = await prisma.user.delete({ where: { id: validatedId.data.id } });

        return sendSuccessResponse(res, "Deleted user successfully.", user);
    } catch (error) {
        return handleError(error, res);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const validatedUser = userCreationSchema.safeParse(req.body);
        if (!validatedUser.success) throw validatedUser.error;

        const { firstName, lastName, email, image } = validatedUser.data;
        const newUser = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            image: image ? image.trim().toLowerCase() : null,
            normalizedName: normalizedUserName(validatedUser.data.firstName, validatedUser.data.lastName),
        };

        const user: User = await prisma.user.create({ data: newUser });

        return sendSuccessResponse(res, "Created user successfully.", user);
    } catch (error) {
        return handleError(error, res);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const validatedId = postGresIdSchema.safeParse(req.params);
        if (!validatedId.success) throw validatedId.error;

        const validatedUserUpdate = userUpdateSchema.safeParse(req.body);
        if (!validatedUserUpdate.success) throw validatedUserUpdate.error;

        const user: User | null = await prisma.user.findUnique({ where: { id: validatedId.data.id } });
        if (!user) throw new CustomError(`User with id: ${validatedId.data.id} not found!`, 404);

        const { firstName, lastName, email, image } = validatedUserUpdate.data;

        const dataToUpdate: iUserUpdate = {};
        if (firstName !== undefined) dataToUpdate.firstName = firstName.trim();
        if (lastName !== undefined) dataToUpdate.lastName = lastName.trim();
        if (email !== undefined) dataToUpdate.email = email.trim().toLowerCase();
        if (image !== undefined) dataToUpdate.image = image;

        if (validatedUserUpdate.data.firstName !== undefined || validatedUserUpdate.data.lastName !== undefined) {
            const newFirst = dataToUpdate.firstName ?? user.firstName;
            const newLast = dataToUpdate.lastName ?? user.lastName;
            dataToUpdate.normalizedName = normalizedUserName(newFirst, newLast);
        }

        const updatedUser: User = await prisma.user.update({ where: { id: validatedId.data.id }, data: dataToUpdate });

        return sendSuccessResponse(res, "Updated user successfully.", updatedUser);
    } catch (error) {
        return handleError(error, res);
    }
};
