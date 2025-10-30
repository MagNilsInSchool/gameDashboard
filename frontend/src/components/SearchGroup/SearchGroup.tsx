import { useSearchParams } from "react-router-dom";
import ProfileCarousel from "../ProfileCarousel/ProfileCarousel";
import "./searchGroup.css";

const SearchGroup: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    };
    return (
        <article className="search-group">
            <input
                className="search-group__search-bar"
                type="text"
                name="search"
                placeholder="search"
                value={search}
                onChange={handleChange}
            />
            <ProfileCarousel />
        </article>
    );
};

export default SearchGroup;
