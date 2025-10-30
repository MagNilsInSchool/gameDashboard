import "./noGamesPlayedDisplay.css";

interface Props {
    text?: string;
}
const NoGamesPlayedDisplay: React.FC<Props> = ({ text = "No games played." }) => {
    return <h2 className="no-games-played">{text}</h2>;
};

export default NoGamesPlayedDisplay;
