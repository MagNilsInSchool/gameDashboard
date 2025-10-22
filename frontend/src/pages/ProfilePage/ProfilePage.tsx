import { useNavigate } from "react-router-dom";
import CtaButton from "../../components/CtaButton/CtaButton";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import useUserStore from "../../stores/userStore";
import "./profilePage.css";
const ProfilePage: React.FC = () => {
    const { activeUser } = useUserStore();
    const navigate = useNavigate();

    return (
        <div className="shared-page-style">
            <main className="profile-page wrapper--max-width">
                <section className="profile-page__row-wrapper">
                    {activeUser && <ProfileCard user={activeUser} />}
                    <ul className="profile-page__minutes-per-game-list">
                        <li className="profile-page__minutes-per-game-list-item">
                            <h2 className="profile-page__minutes-per-game-title">Game 1</h2>
                            <div className="profile-page__minutes-per-game-progress-bar">40 min</div>
                        </li>
                        <li className="profile-page__minutes-per-game-list-item">
                            <h2 className="profile-page__minutes-per-game-title">Game 2</h2>
                            <div className="profile-page__minutes-per-game-progress-bar">40 min</div>
                        </li>
                        <li className="profile-page__minutes-per-game-list-item">
                            <h2 className="profile-page__minutes-per-game-title">Game 3</h2>
                            <div className="profile-page__minutes-per-game-progress-bar">40 min</div>
                        </li>
                        <li className="profile-page__minutes-per-game-list-item">
                            <h2 className="profile-page__minutes-per-game-title">Game 4</h2>
                            <div className="profile-page__minutes-per-game-progress-bar">40 min</div>
                        </li>
                    </ul>
                </section>
                <section className="profile-page__row-wrapper">
                    <div className="profile-page__column-wrapper">
                        <ul className="profile-page__minutes-per-game-list">
                            <li className="profile-page__minutes-per-game-list-item">
                                <h2 className="profile-page__minutes-per-game-title">Game 1</h2>
                                <div className="profile-page__minutes-per-game-progress-bar">40 min</div>
                            </li>
                            <li className="profile-page__minutes-per-game-list-item">
                                <h2 className="profile-page__minutes-per-game-title">Game 2</h2>
                                <div className="profile-page__minutes-per-game-progress-bar">40 min</div>
                            </li>
                            <li className="profile-page__minutes-per-game-list-item">
                                <h2 className="profile-page__minutes-per-game-title">Game 3</h2>
                                <div className="profile-page__minutes-per-game-progress-bar">40 min</div>
                            </li>
                            <li className="profile-page__minutes-per-game-list-item">
                                <h2 className="profile-page__minutes-per-game-title">Game 4</h2>
                                <div className="profile-page__minutes-per-game-progress-bar">40 min</div>
                            </li>
                        </ul>
                    </div>
                    <div className="profile-page__column-wrapper profile-page__column-wrapper--split-rows">
                        <article className="profile-page__total-minute-tracker">
                            <h2 className="profile-page__total-minutes">164 min</h2>
                            <p className="profile-page__total-minutes-description">Total time played</p>
                        </article>
                        <div className="profile-page__button-row">
                            <CtaButton
                                size="giant"
                                text="Choose new player"
                                color="dark"
                                className="profile-page__cta-button"
                                onClick={() => navigate("/")}
                            />
                            <CtaButton
                                size="giant"
                                text="Play new game"
                                color="dark"
                                className="profile-page__cta-button"
                                onClick={() => navigate("/games")}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProfilePage;
