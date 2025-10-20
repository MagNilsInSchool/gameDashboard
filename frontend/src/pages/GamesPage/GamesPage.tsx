import GameCard from "../../components/GameCard/GameCard";
import useGamesStore from "../../stores/gamesStore";

import "./gamesPage.css";
const GamesPage: React.FC = () => {
    const { games } = useGamesStore();
    return (
        <main className="shared-page-style">
            <div className="games-page wrapper--max-width">
                {games.map((game) => (
                    <GameCard key={game.id} gameId={game.id} title={game.title} src={game.src} />
                ))}
                <h2 className="games-page__speach-bubble">CHOOSE A GAME TO PLAY</h2>
            </div>
        </main>
    );
};

export default GamesPage;
