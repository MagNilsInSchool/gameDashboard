import { useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "../../handlers/users";

export const useGetUsers = (normalizedName?: string) => {
    return useQuery({
        queryKey: ["users", normalizedName ?? null],
        queryFn: () => getUsers(normalizedName),
        staleTime: 10_000,
        retry: false,
        placeholderData: (previousData) => previousData,
    });
};

export const useGetUser = (id: number) => {
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => getUser(id),
        enabled: !!id,
        staleTime: 10_000,
        placeholderData: (previousData) => previousData,
    });
};
