import { z } from "zod";

export const gameStatCreationSchema = z
    .object({
        gameId: z.coerce.number().int().min(1).max(2_147_483_647),
        userId: z.coerce.number().int().min(1).max(2_147_483_647),
    })
    .strict();

export const gameStatFilterSchema = z
    .object({
        gameId: z.coerce.number().int().min(1).max(2_147_483_647).optional(),
        userId: z.coerce.number().int().min(1).max(2_147_483_647).optional(),
    })
    .strict();
