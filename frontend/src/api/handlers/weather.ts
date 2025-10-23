import axios from "axios";
import type { iWeather } from "../../interfaces/weather";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const getWeather = async (): Promise<iWeather> => {
    const params = {
        latitude: 59.3793,
        longitude: 13.5036,
        current: ["temperature_2m", "weather_code"],
        timezone: "Europe/Berlin",
    };

    const response = await axios.get(BASE_URL, {
        params,
    });

    const result = response.data.current;

    return result;
};
