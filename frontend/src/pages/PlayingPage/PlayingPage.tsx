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
    const { activeUser } = useUserStore();
    const { data: currentGame, isLoading } = useGetGame(gameId);

    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="playing-page wrapper--max-width">
            <div className="playing-page__game-display">
                {currentGame && <GameCard game={currentGame} />}
                <GameTimer />
            </div>

            {activeUser && <ProfileCard user={activeUser} />}
        </div>
    );
};

export default PlayingPage;
