import RoundButtonGroup from "../RoundButtonGroup/RoundButtonGroup";
import SearchGroup from "../SearchGroup/SearchGroup";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import "./header.css";

interface Props {
    beans: string;
}
const Header: React.FC<Props> = ({ beans }) => {
    return (
        <header className="header">
            <div className="header__wrapper wrapper--max-width">
                <WeatherDisplay />
                <SearchGroup />
                <RoundButtonGroup textContent="Add user" />
            </div>
        </header>
    );
};

export default Header;
