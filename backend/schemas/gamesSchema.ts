import { z } from "zod";

export const gameCreationSchema = z
    .object({
        title: z
            .string()
            .min(2, { message: "title needs to be at least 1 letter." })
            .max(50, { message: "title can be at most 50 letters." }),
    })
    .strict();
export const gameFilterSchema = z.object({
    normalizedTitle: z.string().max(50, { message: "normalizedTitle can be at most 50 letters." }).optional(),
});
