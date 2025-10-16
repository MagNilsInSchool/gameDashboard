import CtaButton from "../CtaButton/CtaButton";
import "./gameTimer.css";

const GameTimer = () => {
    return (
        <article className="game-timer">
            <div className="game-timer__inner-wrapper">
                <h2 className="game-timer__title">TIME PLAYING</h2>
                <p className="game-timer__time-display">00:01:21</p>
            </div>
            <CtaButton text="START" size="large" onClick={() => console.log("Start game")} />
        </article>
    );
};

export default GameTimer;
