import { useParams } from "react-router-dom";
import "./playingPage.css";
import GameCard from "../../components/GameCard/GameCard";
import GameTimer from "../../components/GameTimer/GameTimer";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import useGamesStore from "../../stores/gamesStore";
import useUsersStore from "../../stores/usersStore";

const PlayingPage = () => {
    const { id } = useParams();
    const { games } = useGamesStore();
    const { user } = useUsersStore();
    const currentGame = games[Number(id) - 1];

    return (
        <main className="shared-page-style">
            <div className="playing-page wrapper--max-width">
                <div className="playing-page__game-display">
                    <GameCard gameId={Number(id)} src={currentGame.src} title={currentGame.title} />
                    <GameTimer />
                </div>

                <ProfileCard user={user} />
            </div>
        </main>
    );
};

export default PlayingPage;
