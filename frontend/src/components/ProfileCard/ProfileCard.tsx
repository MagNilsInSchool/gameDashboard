import { useLocation, useNavigate } from "react-router-dom";
import "./profileCard.css";
import type { iUser } from "../../interfaces/user";
import useUserStore from "../../stores/userStore";

interface Props {
    user: iUser;
}

const ProfileCard: React.FC<Props> = ({ user }) => {
    const { setActiveUser } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();
    const isOnProfilePage = location.pathname === `/users/${user.id}`;

    const handleProfileCardClick = () => {
        setActiveUser(user);
        navigate(`/users/${user.id}`);
    };

    return (
        <article
            className={`profile-card ${!isOnProfilePage ? "profile-card--hover" : ""}`}
            onClick={!isOnProfilePage ? handleProfileCardClick : undefined}>
            <img
                className="profile-card__image"
                src={user && user.image ? user.image : "/assets/icons/user-filled.svg"}
                alt="This is a picture of user blabla"
            />
            <h3 className="profile-card__name">{user ? `${user.firstName} ${user.lastName}` : "Loading..."}</h3>
        </article>
    );
};

export default ProfileCard;
