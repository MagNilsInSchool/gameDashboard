import { useParams } from "react-router-dom";
import "./playingPage.css";
import GameCard from "../../components/GameCard/GameCard";
import GameTimer from "../../components/GameTimer/GameTimer";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import useUserStore from "../../stores/userStore";
import { useGetGame } from "../../api/queries/games/useGames";

const PlayingPage = () => {
    const { id } = useParams<{ id: string }>();
    const gameId = Number(id);
    const { data: currentGame, isLoading } = useGetGame(gameId);
    const { user } = useUserStore();

    if (isLoading) return <p>Loading...</p>;
    return (
        <main className="shared-page-style">
            <div className="playing-page wrapper--max-width">
                <div className="playing-page__game-display">
                    {currentGame && <GameCard game={currentGame} />}
                    <GameTimer />
                </div>

                <ProfileCard user={user} />
            </div>
        </main>
    );
};

export default PlayingPage;
