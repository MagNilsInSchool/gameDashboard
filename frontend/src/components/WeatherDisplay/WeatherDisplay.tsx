import "./weatherDisplay.css";
interface Props {}

const WeatherDisplay: React.FC<Props> = () => {
    const temp = 25;
    return (
        <article className="weather-display">
            <h2 className="weather-display__date">Wednesday,15 Oct 2025</h2>
            <div className="weather-display__weather">
                <img className="weather-display__weather-icon" src="assets/icons/weather-dummy.svg" alt="" />
                <span className="weather-display__temperature">{`${temp} \u00B0C`}</span>
            </div>
        </article>
    );
};

export default WeatherDisplay;
