import { useLocation, useNavigate } from "react-router-dom";
import "./gameCard.css";
import type { iGame } from "../../interfaces/game";
import useToastStore from "../../stores/toastStore";
interface Props {
    game: iGame;
    userId?: number;
}
const GameCard: React.FC<Props> = ({ game, userId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const setToast = useToastStore((s) => s.setToastInfo);
    const imageSrc = game.image ? game.image : "/assets/icons/game-logo.svg";

    const handleGameCardClick = () => {
        if (!userId) {
            setToast({ message: "No active user.", type: "error" });
            navigate("/");
            return;
        }
        if (location.pathname === `/games/play/${game.id}/${userId}`) {
            undefined;
            return;
        }
        navigate(`/games/play/${game.id}/${userId}`);
    };
    return (
        <article className="game-card" onClick={handleGameCardClick}>
            <img className="game-card__image" src={imageSrc} alt={`Logotype for the game ${game.title}`} />
            <h2 className="game-card__title">{game.title}</h2>
        </article>
    );
};

export default GameCard;
