import type { iGameWeeklyStat } from "../../interfaces/game";
import { secondsToHMS } from "../../utils/dateAndTime";
import "./gamelLeaderBoard.css";
interface Props {
    gamesData: iGameWeeklyStat[];
}
const GameLeaderBoard: React.FC<Props> = ({ gamesData }) => {
    const sortedGames = [...gamesData].sort((a, b) => {
        const aTime = a.stats[0]?.totalPlayed ?? 0;
        const bTime = b.stats[0]?.totalPlayed ?? 0;
        return bTime - aTime;
    });

    return (
        <ul className="game-leaderboard">
            <h2 className="game-leaderboard__title">Leaderboard</h2>
            <h3 className="game-leaderboard__entry-category">Name</h3>
            <h3 className="game-leaderboard__entry-category">Game</h3>
            <h3 className="game-leaderboard__entry-category">Time Played</h3>
            {sortedGames.map((entry) => {
                const { hours, minutes } = secondsToHMS(entry.stats[0].totalPlayed);
                const timePlayedString = hours ? `${hours}h ${minutes}m` : `${minutes}m`;
                return (
                    <li className="game-leaderboard__entry" key={entry.id}>
                        <span className="game-leaderboard__entry-data">{entry.stats[0].name}</span>
                        <span className="game-leaderboard__entry-data">{entry.title}</span>
                        <span className="game-leaderboard__entry-data">{timePlayedString}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default GameLeaderBoard;
