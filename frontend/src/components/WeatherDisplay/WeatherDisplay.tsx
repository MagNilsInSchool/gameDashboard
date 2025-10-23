import { useGetWeather } from "../../api/queries/weather/useWeather";
import "./weatherDisplay.css";
import type { iWeather } from "../../interfaces/weather";
import { formatDateWeekdayDayMonthYear } from "../../utils/date";

const weatherIcons: Record<number, { description: string; image: string }> = {
    0: { description: "Sunny", image: "http://openweathermap.org/img/wn/01d@2x.png" },
    1: { description: "Mainly Sunny", image: "http://openweathermap.org/img/wn/01d@2x.png" },
    2: { description: "Partly Cloudy", image: "http://openweathermap.org/img/wn/02d@2x.png" },
    3: { description: "Cloudy", image: "http://openweathermap.org/img/wn/03d@2x.png" },
    45: { description: "Foggy", image: "http://openweathermap.org/img/wn/50d@2x.png" },
    48: { description: "Rime Fog", image: "http://openweathermap.org/img/wn/50d@2x.png" },
    51: { description: "Light Drizzle", image: "http://openweathermap.org/img/wn/09d@2x.png" },
    53: { description: "Drizzle", image: "http://openweathermap.org/img/wn/09d@2x.png" },
    55: { description: "Heavy Drizzle", image: "http://openweathermap.org/img/wn/09d@2x.png" },
    56: { description: "Light Freezing Drizzle", image: "http://openweathermap.org/img/wn/09d@2x.png" },
    57: { description: "Freezing Drizzle", image: "http://openweathermap.org/img/wn/09d@2x.png" },
    61: { description: "Light Rain", image: "http://openweathermap.org/img/wn/10d@2x.png" },
    63: { description: "Rain", image: "http://openweathermap.org/img/wn/10d@2x.png" },
    65: { description: "Heavy Rain", image: "http://openweathermap.org/img/wn/10d@2x.png" },
    66: { description: "Light Freezing Rain", image: "http://openweathermap.org/img/wn/10d@2x.png" },
    67: { description: "Freezing Rain", image: "http://openweathermap.org/img/wn/10d@2x.png" },
    71: { description: "Light Snow", image: "http://openweathermap.org/img/wn/13d@2x.png" },
    73: { description: "Snow", image: "http://openweathermap.org/img/wn/13d@2x.png" },
    75: { description: "Heavy Snow", image: "http://openweathermap.org/img/wn/13d@2x.png" },
    77: { description: "Snow Grains", image: "http://openweathermap.org/img/wn/13d@2x.png" },
    80: { description: "Light Showers", image: "http://openweathermap.org/img/wn/09d@2x.png" },
    81: { description: "Showers", image: "http://openweathermap.org/img/wn/09d@2x.png" },
    82: { description: "Heavy Showers", image: "http://openweathermap.org/img/wn/09d@2x.png" },
    85: { description: "Light Snow Showers", image: "http://openweathermap.org/img/wn/13d@2x.png" },
    86: { description: "Snow Showers", image: "http://openweathermap.org/img/wn/13d@2x.png" },
    95: { description: "Thunderstorm", image: "http://openweathermap.org/img/wn/11d@2x.png" },
    96: { description: "Light Thunderstorms With Hail", image: "http://openweathermap.org/img/wn/11d@2x.png" },
    99: { description: "Thunderstorm With Hail", image: "http://openweathermap.org/img/wn/11d@2x.png" },
};

export const getWeatherIcon = (data?: iWeather | null) => {
    const fallback = {
        description: "Man shrugging. Who knows what weather we are getting.",
        image: "/assets/icons/fallback.png",
    };
    if (!data) return fallback;
    const code = Number(data.weather_code);
    return weatherIcons[code] ?? fallback;
};

const WeatherDisplay: React.FC = () => {
    const { data, isLoading, isError, refetch } = useGetWeather();
    const temperatureRounded = data?.temperature_2m ? `${Math.round(data.temperature_2m)} \u00B0C` : "";
    const todaysDate = formatDateWeekdayDayMonthYear(new Date());

    if (isError) return <p onClick={() => refetch()}>Failed to fetch weather. Click to retry</p>;

    return (
        <article className="weather-display">
            <h2 className="weather-display__date">{todaysDate}</h2>
            <div className="weather-display__weather">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <img
                            className="weather-display__weather-icon"
                            src={getWeatherIcon(data).image}
                            alt={getWeatherIcon(data).description}
                        />
                        <span className="weather-display__temperature">{temperatureRounded}</span>
                    </>
                )}
            </div>
        </article>
    );
};

export default WeatherDisplay;
