import { useLocation, useNavigate } from "react-router-dom";
import "./roundButtonGroup.css";

const RoundButtonGroup: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleRoundButtonClick = () => {
        if (location.pathname === "/users/register") {
            navigate(-1);
            return;
        }
        navigate("/users/register");
    };
    const roundButtonGroupText = location.pathname === "/users/register" ? "Go Back" : "Add User";
    const buttonImage =
        location.pathname === "/users/register" ? "/assets/icons/chevron.svg" : "/assets/icons/plus.svg";
    return (
        <div className="round-button-group">
            <h2 className="round-button-group__text">{roundButtonGroupText}</h2>
            <button className="round-button-group__button" onClick={handleRoundButtonClick}>
                <img src={buttonImage} className="round-button-group__button-image" />
            </button>
        </div>
    );
};

export default RoundButtonGroup;
