import GameCard from "../../components/GameCard/GameCard";
import "./gamesPage.css";
const GamesPage: React.FC = () => {
    const games = [
        { id: 1, title: "Beantown", src: "assets/icons/game-logo.svg" },
        { id: 2, title: "Revenge of beans!", src: "assets/icons/game-logo.svg" },
        { id: 3, title: "Can it be beans?", src: "assets/icons/game-logo.svg" },
        { id: 4, title: "Are you kidney beans?", src: "assets/icons/game-logo.svg" },
        { id: 5, title: "Bunda bean", src: "assets/icons/game-logo.svg" },
        { id: 6, title: "Grand theft bean", src: "assets/icons/game-logo.svg" },
        { id: 7, title: "A can of beans", src: "assets/icons/game-logo.svg" },
        { id: 8, title: "Beantown 2", src: "assets/icons/game-logo.svg" },
    ];
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
