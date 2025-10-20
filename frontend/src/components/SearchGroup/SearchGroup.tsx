import ProfileCarousel from "../ProfileCarousel/ProfileCarousel";
import "./searchGroup.css";

const SearchGroup: React.FC = () => {
    return (
        <article className="search-group">
            <input className="search-group__search-bar" type="text" name="search" placeholder="search" />
            <ProfileCarousel />
        </article>
    );
};

export default SearchGroup;
