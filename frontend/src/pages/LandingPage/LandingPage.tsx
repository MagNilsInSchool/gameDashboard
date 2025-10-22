import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./landingPage.css";

import type { iUser } from "../../interfaces/user";
import { useGetUsers } from "../../api/queries/users/useUsers";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import { handleApiError } from "../../api/errorHandler/handleApiErrors";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    const { data, isError, error, isLoading } = useGetUsers();

    useEffect(() => {
        if (isError) handleApiError(error, navigate);
    }, [isError, error, navigate]);

    if (isLoading) return <Loader />;

    return (
        <main className="shared-page-style">
            <div className="landing-page wrapper--max-width">
                {data?.map((user: iUser) => (
                    <ProfileCard user={user} key={user.id} />
                ))}
            </div>
        </main>
    );
};

export default LandingPage;
