import { useParams } from "react-router-dom";
import "./playingPage.css";
import useUsersStore from "../../stores/usersStore";
import GameCard from "../../components/GameCard/GameCard";
import GameTimer from "../../components/GameTimer/GameTimer";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const PlayingPage = () => {
    const { id } = useParams();
    const { games, user } = useUsersStore();
    const currentGame = games[Number(id) - 1];

    return (
        <main className="shared-page-style">
            <div className="playing-page wrapper--max-width">
                <div className="playing-page__game-display">
                    <GameCard gameId={Number(id)} src={currentGame.src} title={currentGame.title} />
                    <GameTimer />
                </div>

                <ProfileCard firstName={user.firstName} lastName={user.lastName} src={user.src} userId={user.id} />
            </div>
        </main>
    );
};

export default PlayingPage;
