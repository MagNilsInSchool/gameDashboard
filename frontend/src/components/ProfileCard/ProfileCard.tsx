import { useNavigate } from "react-router-dom";
import "./profileCard.css";
import type { iUser } from "../../interfaces/users";

interface Props {
    user: iUser;
}

const ProfileCard: React.FC<Props> = ({ user }) => {
    const navigate = useNavigate();
    return (
        <article className="profile-card" onClick={() => navigate(`/users/${user.id}`)}>
            <img className="profile-card__image" src={user.src} alt="This is a picture of user blabla" />
            <h3 className="profile-card__name">{`${user.firstName} ${user.lastName}`}</h3>
        </article>
    );
};

export default ProfileCard;
