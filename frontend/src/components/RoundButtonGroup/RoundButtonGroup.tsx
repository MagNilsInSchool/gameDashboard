import "./roundButtonGroup.css";

interface Props {
    textContent: string;
}
const RoundButtonGroup: React.FC<Props> = ({ textContent }) => {
    return (
        <div className="round-button-group">
            <h2 className="round-button-group__text">{textContent}</h2>
            <button className="round-button-group__button">
                <span className="round-button-group__button--text">+</span>
            </button>
        </div>
    );
};

export default RoundButtonGroup;
