import { z } from "zod";

const nameString = z.preprocess(
    (val) => {
        if (typeof val === "string") return val.trim();
        return val;
    },
    z
        .string()
        .regex(/^[\p{L}]+$/u, { message: "Name may only contain letters." })
        .min(2, { message: "Name needs to be at least 2 letters." })
        .max(20, { message: "Name can be at most 20 letters." })
);
export const userCreationSchema = z
    .object({
        firstName: nameString,
        lastName: nameString,
        email: z
            .email()
            .min(4, { message: "Email needs to be at least 4 letters." })
            .max(50, { message: "Email can be at most 50 letters." }),
        image: z
            .string()
            .min(20, { message: "Image needs to be at least 20 letters." })
            .max(100, { message: "Image can be at most 100 letters." })
            .optional(),
    })
    .strict();

export type iUserRegistration = z.infer<typeof userCreationSchema>;
