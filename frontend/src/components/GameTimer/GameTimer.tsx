import { secondsToHMS } from "../../utils/dateAndTime";
import { padNumbers } from "../../utils/numberFormat";
import CtaButton from "../CtaButton/CtaButton";
import "./gameTimer.css";

interface Props {
    timeInSeconds: number;
    timerFunction: () => void;
    buttonText: string;
}

const GameTimer: React.FC<Props> = ({ timeInSeconds, timerFunction, buttonText }) => {
    const { hours, minutes, seconds } = padNumbers(secondsToHMS(timeInSeconds));
    return (
        <article className="game-timer">
            <div className="game-timer__inner-wrapper">
                <h2 className="game-timer__title">TIME PLAYING</h2>
                <p className="game-timer__time-display">{`${hours}:${minutes}:${seconds}`}</p>
            </div>
            <CtaButton text={buttonText} size="large" onClick={timerFunction} />
        </article>
    );
};

export default GameTimer;
