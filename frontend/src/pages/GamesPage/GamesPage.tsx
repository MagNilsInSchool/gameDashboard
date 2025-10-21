import { useGetGames } from "../../api/queries/games/useGames";
import GameCard from "../../components/GameCard/GameCard";

import "./gamesPage.css";
const GamesPage: React.FC = () => {
    const { data } = useGetGames();
    return (
        <main className="shared-page-style">
            <div className="games-page wrapper--max-width">
                {data && data.map((game) => <GameCard key={game.id} game={game} />)}
                <h2 className="games-page__speach-bubble">CHOOSE A GAME TO PLAY</h2>
            </div>
        </main>
    );
};

export default GamesPage;
