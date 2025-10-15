import type { Response } from "express";

export interface SuccessResponse<T> {
    success: true;
    message: string;
    data: T;
    count: number;
}

const getCount = (data: unknown): number => {
    if (data == null) return 0;
    if (Array.isArray(data)) return data.length;
    return 1;
};

export const makeSuccessResponse = <T>(message: string, data: T): SuccessResponse<T> => {
    return { success: true, message, count: getCount(data), data };
};

export const sendSuccessResponse = <T>(res: Response, message: string, data: T, status = 200) => {
    return res.status(status).json(makeSuccessResponse<T>(message, data));
};
