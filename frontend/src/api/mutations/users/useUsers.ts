import { useMutation } from "@tanstack/react-query";
import type { iUserRegistration } from "../../../schemas/userSchemas";
import { registerUser } from "../../handlers/users";

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (value: iUserRegistration) => registerUser(value),
    });
};
