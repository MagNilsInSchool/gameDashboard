import { useEffect, useState } from "react";
import { useGetGames } from "../../api/queries/games/useGames";
import GameCard from "../../components/GameCard/GameCard";
import "./gamesPage.css";
import { handleApiError } from "../../api/errorHandler/handleApiErrors";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useUserStore from "../../stores/userStore";
import useToastStore from "../../stores/toastStore";
const GamesPage: React.FC = () => {
    const navigate = useNavigate();
    const activeUser = useUserStore((s) => s.activeUser);
    const setToastInfo = useToastStore((s) => s.setToastInfo);
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") ?? undefined;
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const { data, isError, error, isLoading } = useGetGames(debouncedSearch);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        if (isError) handleApiError(error, navigate, setToastInfo);
    }, [isError, error, navigate, setToastInfo]);

    if (isLoading) return <Loader />;

    return (
        <div className="games-page wrapper--max-width">
            {data?.map((game) => (
                <GameCard key={game.id} game={game} userId={activeUser?.id} />
            ))}
            {data && data.length > 0 && <h2 className="games-page__speach-bubble">CHOOSE A GAME TO PLAY</h2>}
        </div>
    );
};

export default GamesPage;
