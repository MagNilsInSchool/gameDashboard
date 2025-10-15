import ProfileCarousel from "../ProfileCarousel/ProfileCarousel";
import "./searchGroup.css";

const SearchGroup: React.FC = () => {
    return (
        <article className="search-group">
            <input type="text" placeholder="search" className="search-group__search-bar" />
            <ProfileCarousel />
        </article>
    );
};

export default SearchGroup;
