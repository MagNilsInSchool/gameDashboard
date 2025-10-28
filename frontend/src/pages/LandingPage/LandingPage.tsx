import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./landingPage.css";
import type { iUser } from "../../interfaces/user";
import { useGetUsers } from "../../api/queries/users/useUsers";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import { handleApiError } from "../../api/errorHandler/handleApiErrors";
import { useNavigate } from "react-router-dom";
import useToastStore from "../../stores/toastStore";

const LandingPage = () => {
    const navigate = useNavigate();
    const setToastInfo = useToastStore((s) => s.setToastInfo);
    const { data, isError, error, isLoading } = useGetUsers();

    useEffect(() => {
        if (isError) handleApiError(error, navigate, setToastInfo);
    }, [isError, error, navigate]);

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
