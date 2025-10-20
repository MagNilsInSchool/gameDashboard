import RoundButtonGroup from "../RoundButtonGroup/RoundButtonGroup";
import SearchGroup from "../SearchGroup/SearchGroup";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import "./header.css";

interface Props {}
const Header: React.FC<Props> = () => {
    return (
        <header className="header">
            <div className="header__wrapper wrapper--max-width">
                <WeatherDisplay />
                <SearchGroup />
                <RoundButtonGroup />
            </div>
        </header>
    );
};

export default Header;
