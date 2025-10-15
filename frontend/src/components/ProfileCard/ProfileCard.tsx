import { useNavigate } from "react-router-dom";
import "./profileCard.css";

interface Props {
    src: string;
    firstName: string;
    lastName: string;
    userId: number;
}

const ProfileCard: React.FC<Props> = ({ src, firstName, lastName, userId }) => {
    const navigate = useNavigate();
    return (
        <article className="profile-card" onClick={() => navigate(`/users/${userId}`)}>
            <img className="profile-card__image" src={src} alt="This is a picture of user blabla" />
            <h3 className="profile-card__name">{`${firstName} ${lastName}`}</h3>
        </article>
    );
};

export default ProfileCard;
