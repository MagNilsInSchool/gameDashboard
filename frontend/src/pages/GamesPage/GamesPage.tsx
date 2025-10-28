import { useEffect } from "react";
import { useGetGames } from "../../api/queries/games/useGames";
import GameCard from "../../components/GameCard/GameCard";

import "./gamesPage.css";
import { handleApiError } from "../../api/errorHandler/handleApiErrors";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useUserStore from "../../stores/userStore";
import useToastStore from "../../stores/toastStore";
const GamesPage: React.FC = () => {
    const navigate = useNavigate();
    const activeUser = useUserStore((s) => s.activeUser);
    const setToastInfo = useToastStore((s) => s.setToastInfo);
    const { data, isError, error, isLoading } = useGetGames();

    useEffect(() => {
        if (isError) handleApiError(error, navigate, setToastInfo);
    }, [isError, error, navigate]);

    if (isLoading) return <Loader />;

    return (
        <div className="games-page wrapper--max-width">
            {data?.map((game) => (
                <GameCard key={game.id} game={game} userId={activeUser?.id} />
            ))}
            <h2 className="games-page__speach-bubble">CHOOSE A GAME TO PLAY</h2>
        </div>
    );
};

export default GamesPage;
