import "./profileCarousel.css";

const ProfileCarousel: React.FC = () => {
    const profiles = [
        { src: "/assets/icons/user-filled.svg" },
        { src: "/assets/icons/user-filled.svg" },
        { src: "/assets/icons/user-filled.svg" },
        { src: "/assets/icons/user-filled.svg" },
        { src: "/assets/icons/user-filled.svg" },
        { src: "/assets/icons/user-filled.svg" },
    ];
    return (
        <article className="profile-carousel">
            <button className="profile-carousel__button">
                <img
                    src="/assets/icons/chevron.svg"
                    alt="Chevron pointing left."
                    aria-label="Previous profile"
                    className="profile-carousel__button-image"
                />
            </button>
            <ul className="profile-carousel__profile-list">
                {profiles.map((profile, i) => (
                    <li className="profile-carousel__profile-list-item" key={i}>
                        <img src={profile.src} alt="profile picture" className="profile-carousel__profile-picture" />
                    </li>
                ))}
            </ul>
            <button className="profile-carousel__button profile-carousel__button--right">
                <img
                    src="/assets/icons/chevron.svg"
                    alt="Chevron pointing left."
                    aria-label="Previous profile"
                    className="profile-carousel__button-image profile-carousel__button-image--right"
                />
            </button>
        </article>
    );
};

export default ProfileCarousel;
