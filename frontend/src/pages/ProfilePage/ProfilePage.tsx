import { useNavigate, useParams } from "react-router-dom";
import CtaButton from "../../components/CtaButton/CtaButton";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./profilePage.css";
import ChartHorizontalBar from "../../components/ChartHorizontalBar/ChartHorizontalBar";
import { useGetUser } from "../../api/queries/users/useUsers";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import useToastStore from "../../stores/toastStore";
import ChartDoughnut from "../../components/ChartDoughnut/ChartDoughnut";
import ChartScatter from "../../components/ChartScatter/ChartScatter";
import ChartLines from "../../components/ChartLines/ChartLines";
import ChartHorizontalBarWeeklyTotal from "../../components/ChartHorizontalBarWeeklyTotal/ChartHorizontalBarWeeklyTotal";
import GameLeaderBoard from "../../components/GameLeaderBoard/GameLeaderBoard";
import { secondsToHMS } from "../../utils/dateAndTime";
import { useGetWeeklyGamesStats } from "../../api/queries/games/useGames";
import NoGamesPlayedDisplay from "../../components/NoGamesPlayedDisplay/NoGamesPlayedDisplay";

const ProfilePage: React.FC = () => {
    const setToastInfo = useToastStore((s) => s.setToastInfo);
    const { id } = useParams();
    const userId = Number(id);

    const navigate = useNavigate();

    const {
        data: currentUser,
        isLoading: isCurrentUserLoading,
        isError: isCurrentUserError,
        error: currentUserError,
    } = useGetUser(userId);
    const {
        data: sevenDayStats,
        isLoading: isSevenDayStatsLoading,
        isError: isSevenDayStatsError,
        error: sevenDayStatsError,
    } = useGetWeeklyGamesStats();

    useEffect(() => {
        if (isCurrentUserError || isSevenDayStatsError) {
            if (currentUserError) setToastInfo({ message: currentUserError.message, type: "error" });
            if (sevenDayStatsError) setToastInfo({ message: sevenDayStatsError.message, type: "error" });
            navigate("/");
        }
    }, [isCurrentUserError, currentUserError, isSevenDayStatsError, sevenDayStatsError, setToastInfo, navigate]);

    //* Current "logged in" user info:
    const currentUserGameLabels = currentUser?.stats?.map((stat) => stat.title);
    const currentUserGameStats = currentUser?.stats?.map((stat) => stat.totalTimePlayed);
    const currentUserTotalTimePlayed = currentUserGameStats?.reduce((accum, current) => accum + current, 0);
    const { hours, minutes } = secondsToHMS(currentUserTotalTimePlayed ?? 0);
    const totalTimePlayedString = hours ? `${hours}h ${minutes}m` : `${minutes}m`;

    if (isCurrentUserLoading || isSevenDayStatsLoading) return <Loader />;

    return (
        <div className="profile-page wrapper--max-width">
            <section className="profile-page__row-wrapper">
                <div className="profile-page__profile-colum-split">
                    {currentUser && <ProfileCard user={currentUser} />}

                    <ChartHorizontalBar labels={currentUserGameLabels ?? []} data={currentUserGameStats ?? []} />
                </div>
            </section>

            <section className="profile-page__row-wrapper">
                <div className="profile-page__column-wrapper">
                    <ul className="profile-page__minutes-per-game-list">
                        {currentUser?.stats && currentUser.stats.length > 0 ? (
                            currentUser.stats.map((stat) => {
                                const userTotalTimePlayed = currentUserTotalTimePlayed ?? 0;
                                const gameTotalTimePlayed = stat.totalTimePlayed ?? 0;
                                const percent = Math.round((gameTotalTimePlayed / userTotalTimePlayed) * 100);
                                const rest = Math.max(0, userTotalTimePlayed - gameTotalTimePlayed);
                                return (
                                    <li key={stat.gameId} className="profile-page__minutes-per-game-list-item">
                                        <img
                                            className="profile-page__minutes-per-game-list-item-icon"
                                            src="/assets/icons/game-logo.svg"
                                            alt="Game logotype"
                                        />
                                        <h2 className="profile-page__minutes-per-game-list-title">{stat.title}</h2>
                                        <ChartDoughnut
                                            labels={[stat.title, "Other"]}
                                            data={[gameTotalTimePlayed, rest]}
                                            percent={percent}
                                        />
                                    </li>
                                );
                            })
                        ) : (
                            <NoGamesPlayedDisplay />
                        )}
                    </ul>
                </div>
                <div className="profile-page__column-wrapper profile-page__column-wrapper--split-rows">
                    <article className="profile-page__total-minute-tracker">
                        <h2 className="profile-page__total-minutes">{totalTimePlayedString}</h2>
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

            {sevenDayStats && (
                <>
                    <section className="profile-page__row-wrapper">
                        <ChartScatter gamesData={sevenDayStats} />
                        <ChartLines gamesData={sevenDayStats} />
                    </section>

                    <section className="profile-page__row-wrapper">
                        <ChartHorizontalBarWeeklyTotal gamesData={sevenDayStats} />
                        <GameLeaderBoard gamesData={sevenDayStats} />
                    </section>
                </>
            )}
        </div>
    );
};

export default ProfilePage;
