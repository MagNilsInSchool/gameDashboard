import { useLocation, useNavigate } from "react-router-dom";
import "./gameCard.css";
import type { iGame } from "../../interfaces/game";
interface Props {
    game: iGame;
}
const GameCard: React.FC<Props> = ({ game }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const imageSrc = game.image ? game.image : "/assets/icons/game-logo.svg";
    return (
        <article
            className="game-card"
            onClick={
                location.pathname !== `/games/play/${game.id}` ? () => navigate(`/games/play/${game.id}`) : undefined
            }>
            <img className="game-card__image" src={imageSrc} alt={`Logotype for the game ${game.title}`} />
            <h2 className="game-card__title">{game.title}</h2>
        </article>
    );
};

export default GameCard;
