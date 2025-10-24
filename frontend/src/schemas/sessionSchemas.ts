import { z } from "zod";

export const sessionCreationSchema = z
    .object({
        gameId: z.coerce.number().int().min(1).max(2_147_483_647),
        userId: z.coerce.number().int().min(1).max(2_147_483_647),
    })
    .strict();

export type iSessionCreation = z.infer<typeof sessionCreationSchema>;
