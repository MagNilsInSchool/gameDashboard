import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../../handlers/weather";

export const useGetWeather = () => {
    return useQuery({
        queryKey: ["weather"],
        queryFn: getWeather,
        staleTime: 60_000 * 10,
        placeholderData: (previousData) => previousData,
    });
};
