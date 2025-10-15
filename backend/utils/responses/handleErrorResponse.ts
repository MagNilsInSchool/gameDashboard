import { ZodError } from "zod";
import type { Response } from "express";
import { Prisma } from "@prisma/client";

export class CustomError extends Error {
    code: number;

    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        this.name = "CustomError";
    }
}

const formatValidationErrors = (zodError: ZodError) =>
    zodError.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
        code: issue.code,
        expected: "expected" in issue ? issue.expected : undefined,
        received: "received" in issue ? issue.received : undefined,
    }));

export interface ErrorResponse<T = unknown> {
    success: false;
    message: string;
    error?: string;
    details?: T;
}

export const makeErrorResponse = <T = unknown>(message: string, error?: string, details?: T): ErrorResponse<T> => ({
    success: false,
    message,
    error,
    details,
});

export const sendErrorResponse = <T = unknown>(
    res: Response,
    message: string,
    error?: string,
    details?: T,
    status = 500
) => res.status(status).json(makeErrorResponse<T>(message, error, details));

export const handleZodError = (error: ZodError, res: Response) =>
    sendErrorResponse(res, "Validation failed", undefined, formatValidationErrors(error), 400);

export const handleCustomError = (error: CustomError, res: Response) =>
    sendErrorResponse(res, error.message, undefined, undefined, error.code);

const sanitizeMessage = (msg: string | undefined): string =>
    (msg ?? "")
        .trim()
        .replace(/\r\n/g, "\n") // normalize CRLF
        .replace(/\n+/g, " ") // collapse newlines to single space
        .replace(/\s+/g, " ") // collapse extra whitespace
        .trim();

export const handlePrismaError = (error: unknown, res: Response): boolean => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const safeMsg = sanitizeMessage(error.message);
        if (error.code === "P2002") {
            const target = (error.meta as any)?.target;
            const detail = Array.isArray(target) ? `Fields: ${target.join(", ")}` : undefined;
            sendErrorResponse(res, "Unique constraint failed", safeMsg, detail, 409);
            return true;
        }
        if (error.code === "P2025") {
            sendErrorResponse(res, "Record not found", safeMsg, undefined, 404);
            return true;
        }
        sendErrorResponse(res, "Database request error", safeMsg, undefined, 400);
        return true;
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        sendErrorResponse(res, "Prisma validation error", sanitizeMessage((error as Error).message), undefined, 400);
        return true;
    }

    if (
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientRustPanicError ||
        error instanceof Prisma.PrismaClientUnknownRequestError
    ) {
        sendErrorResponse(res, "Database internal error", sanitizeMessage((error as Error).message), undefined, 500);
        return true;
    }

    return false;
};
export const handleError = (error: unknown, res: Response, code: number = 500) => {
    console.error("Error occurred:", error);

    if (error instanceof ZodError) return handleZodError(error, res);
    if (error instanceof CustomError) return handleCustomError(error, res);
    if (handlePrismaError(error, res)) return; // prisma-specific handling done

    return sendErrorResponse(
        res,
        "Internal server error",
        error instanceof Error ? error.message : "Unknown error",
        undefined,
        code
    );
};
