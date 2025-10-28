import { secondsToHMS } from "../../utils/dateAndTime";
import "./gamelLeaderBoard.css";
const GameLeaderBoard = () => {
    const dataSample = [
        { name: "Farty Mcgass", game: "Call of beans", totalPlayed: 2001 },
        { name: "Sally Bean", game: "Beany Kong", totalPlayed: 1820 },
        { name: "Joey Sprinkles", game: "Grand theft bean", totalPlayed: 1599 },
        { name: "Maya Pinto", game: "Super Bean brothers", totalPlayed: 1345 },
    ];
    return (
        <ul className="game-leaderboard">
            <h2 className="game-leaderboard__title">Leaderboard</h2>
            <h3 className="game-leaderboard__entry-category">Name</h3>
            <h3 className="game-leaderboard__entry-category">Game</h3>
            <h3 className="game-leaderboard__entry-category">Time Played</h3>
            {dataSample.map((entry, i) => {
                const { hours, minutes } = secondsToHMS(entry.totalPlayed);
                const timePlayedString = hours ? `${hours} hours ${minutes} minutes` : `${minutes} minutes`;
                return (
                    <li className="game-leaderboard__entry" key={i}>
                        <span className="game-leaderboard__entry-data">{entry.name}</span>
                        <span className="game-leaderboard__entry-data">{entry.game}</span>
                        <span className="game-leaderboard__entry-data">{timePlayedString}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default GameLeaderBoard;
