import { useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "../../handlers/users";

export const useGetUsers = (normalizedName?: string) => {
    return useQuery({
        queryKey: ["users", normalizedName ?? null],
        queryFn: () => getUsers(normalizedName),
        staleTime: 1 * 60 * 1000,
        placeholderData: (previousData) => previousData,
    });
};

export const useGetUser = (id: number) => {
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => getUser(id),
        staleTime: 0.5 * 60 * 1000,
        placeholderData: (previousData) => previousData,
    });
};
