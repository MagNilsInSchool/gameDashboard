import { z } from "zod";

export const userCreationSchema = z
    .object({
        firstName: z
            .string()
            .min(2, { message: "firstName needs to be at least 2 letters." })
            .max(20, { message: "firstName can be at most 20 letters." }),
        lastName: z
            .string()
            .min(2, { message: "lastName needs to be at least 2 letters." })
            .max(20, { message: "lastName can be at most 20 letters." }),
        email: z
            .email()
            .min(4, { message: "email needs to be at least 4 letters." })
            .max(50, { message: "email can be at most 50 letters." }),
        image: z
            .string()
            .min(20, { message: "image needs to be at least 20 letters." })
            .max(100, { message: "image can be at most 100 letters." })
            .optional(),
    })
    .strict();

export const userFilterSchema = z.object({
    normalizedName: z.string().max(40, { message: "normalizedName can be at most 40 letters." }).optional(),
});

export const userUpdateSchema = userCreationSchema
    .extend(userFilterSchema.shape)
    .partial()
    .refine((obj) => Object.keys(obj).length > 0, {
        message: "At least one field must be provided for update.",
    })
    .strict();

export type iUserUpdate = z.infer<typeof userUpdateSchema>;
