import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/responses/handleSuccessResponse.ts";
import { handleError } from "../utils/responses/handleErrorResponse.ts";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    try {
        // TODO: replace with real DB query, e.g. `await prisma.user.findMany()` once you have a User model
        const users: unknown[] = []; // placeholder until your Prisma model exists
        return sendSuccessResponse(res, "Fetched users", users);
    } catch (error) {
        return handleError(error, res);
    }
};
