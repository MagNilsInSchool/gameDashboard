import { Link, useLocation } from "react-router-dom";
import "./sideNavigation.css";
import useUserStore from "../../stores/userStore";
import useToastStore from "../../stores/toastStore";

const SideNavigation = () => {
    const location = useLocation();
    const activeUser = useUserStore((s) => s.activeUser);
    const setToastInfo = useToastStore((s) => s.setToastInfo);

    const routes = [
        {
            route: "/",
            text: "Users",
            activeSrc: "/assets/icons/users-filled.svg",
            inactiveSrc: "/assets/icons/users.svg",
            alt: "Silhouette of two people.",
        },
        {
            route: "/games",
            text: "Games",
            activeSrc: "/assets/icons/games-filled.svg",
            inactiveSrc: "/assets/icons/games.svg",
            alt: "A d-pad from a gaming controller.",
        },
        {
            route: activeUser ? `/users/${activeUser.id}` : "",
            text: "Profile",
            activeSrc: "/assets/icons/user-filled.svg",
            inactiveSrc: "/assets/icons/user.svg",
            alt: "Silhouette of one person.",
        },
    ];

    return (
        <aside className="side-navigation">
            <nav className="side-navigation__wrapper">
                <ul className="side-navigation__list">
                    {routes.map((route) => (
                        <li
                            className={`side-navigation__list-item ${
                                location.pathname === route.route ? "" : "side-navigation__list-item--inactive"
                            }`}
                            key={route.route}>
                            <Link
                                className="side-navigation__link"
                                to={route.route}
                                onClick={
                                    route.route === ""
                                        ? () =>
                                              setToastInfo({
                                                  type: "info",
                                                  message: "You have to select a user first.",
                                              })
                                        : undefined
                                }>
                                <img
                                    className="side-navigation__link-icon"
                                    src={location.pathname === route.route ? route.activeSrc : route.inactiveSrc}
                                    alt={route.alt}
                                />
                                <span className="side-navigation__link-text">{route.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default SideNavigation;
