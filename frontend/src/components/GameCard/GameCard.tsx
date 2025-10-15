import { useNavigate } from "react-router-dom";
import "./gameCard.css";
interface Props {
    title: string;
    src: string;
    gameId: number;
}
const GameCard: React.FC<Props> = ({ title, src, gameId }) => {
    const navigate = useNavigate();
    return (
        <article className="game-card" onClick={() => navigate(`/games/play/${gameId}`)}>
            <img className="game-card__image" src={src} alt={`Logotype for the game ${title}`} />
            <h2 className="game-card__title">{title}</h2>
        </article>
    );
};

export default GameCard;
