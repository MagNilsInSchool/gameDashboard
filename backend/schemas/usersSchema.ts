import { z } from "zod";

export const userSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "category needs to be at least 2 letters." })
        .max(20, { message: "category needs to be at most 20 letters." }),
});
