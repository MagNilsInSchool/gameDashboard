import { useQuery } from "@tanstack/react-query";
import { getGame, getGames, getWeeklyGamesStats, getWeeklyGameStats } from "../../handlers/games";

export const useGetGames = (normalizedTitle?: string) => {
    return useQuery({
        queryKey: ["games", normalizedTitle ?? null],
        queryFn: () => getGames(normalizedTitle),
        staleTime: 60_000,
        retry: false,
        placeholderData: (previousData) => previousData,
    });
};

export const useGetGame = (id: number) => {
    return useQuery({
        queryKey: ["games", id],
        queryFn: () => getGame(id),
        enabled: !!id,
        staleTime: 30_000,
        placeholderData: (previousData) => previousData,
    });
};

export const useGetWeeklyGameStats = (id: number) => {
    return useQuery({
        queryKey: ["weeklygamestat", id],
        queryFn: () => getWeeklyGameStats(id),
        enabled: !!id,
        staleTime: 30_000,
        placeholderData: (previousData) => previousData,
    });
};

export const useGetWeeklyGamesStats = () => {
    return useQuery({
        queryKey: ["weeklygamestats"],
        queryFn: () => getWeeklyGamesStats(),
        staleTime: 10_000,
        placeholderData: (previousData) => previousData,
    });
};
