import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./landingPage.css";
import type { iUser } from "../../interfaces/user";
import { useGetUsers } from "../../api/queries/users/useUsers";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { handleApiError } from "../../api/errorHandler/handleApiErrors";
import { useNavigate, useSearchParams } from "react-router-dom";
import useToastStore from "../../stores/toastStore";

const LandingPage = () => {
    const navigate = useNavigate();
    const setToastInfo = useToastStore((s) => s.setToastInfo);
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") ?? undefined;

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const { data, isError, error, isLoading } = useGetUsers(debouncedSearch);

    useEffect(() => {
        if (isError) handleApiError(error, navigate, setToastInfo);
    }, [isError, error, navigate, setToastInfo]);

    if (isLoading) return <Loader />;

    return (
        <div className="landing-page wrapper--max-width">
            {data?.map((user: iUser) => (
                <ProfileCard user={user} key={user.id} />
            ))}
        </div>
    );
};

export default LandingPage;
