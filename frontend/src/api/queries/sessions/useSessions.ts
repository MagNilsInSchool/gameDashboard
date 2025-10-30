import { useQuery } from "@tanstack/react-query";
import { getSevenDayAverage, getWeeklyLeaderBoard } from "../../handlers/sessions";

export const useGetWeeklyAverages = () => {
    return useQuery({
        queryKey: ["weeklyAverages"],
        queryFn: () => getSevenDayAverage(),
        staleTime: 10_000,
        placeholderData: (previousData) => previousData,
    });
};
export const useGetWeeklyLeaderBoard = () => {
    return useQuery({
        queryKey: ["weeklyLeaderBoard"],
        queryFn: () => getWeeklyLeaderBoard(),
        staleTime: 10_000,
        placeholderData: (previousData) => previousData,
    });
};
