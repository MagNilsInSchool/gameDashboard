import { useGetWeeklyLeaderBoard } from "../../api/queries/sessions/useSessions";
import { secondsToHMS } from "../../utils/dateAndTime";
import Loader from "../Loader/Loader";
import "./gamelLeaderBoard.css";
const GameLeaderBoard = () => {
    const { data, isLoading } = useGetWeeklyLeaderBoard();

    return (
        <ul className="game-leaderboard">
            {isLoading ? (
                <Loader className="loader--center" />
            ) : (
                <>
                    <h2 className="game-leaderboard__title">Leaderboard</h2>
                    <h3 className="game-leaderboard__entry-category">Name</h3>
                    <h3 className="game-leaderboard__entry-category">Game</h3>
                    <h3 className="game-leaderboard__entry-category">Time Played</h3>
                    {data?.map((entry) => {
                        const { hours, minutes } = secondsToHMS(entry.played);
                        const timePlayedString = hours ? `${hours} hours ${minutes} minutes` : `${minutes} minutes`;
                        return (
                            <li className="game-leaderboard__entry" key={entry.gameId}>
                                <span className="game-leaderboard__entry-data">{entry.user}</span>
                                <span className="game-leaderboard__entry-data">{entry.game}</span>
                                <span className="game-leaderboard__entry-data">{timePlayedString}</span>
                            </li>
                        );
                    })}
                </>
            )}
        </ul>
    );
};

export default GameLeaderBoard;
