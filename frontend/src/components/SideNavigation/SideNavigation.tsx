import { Link } from "react-router-dom";
import "./sideNavigation.css";

const SideNavigation = () => {
    const routes = [
        { route: "/", text: "Users", src: "/assets/react.svg", alt: "" },
        { route: "/games", text: "Games", src: "/assets/react.svg", alt: "" },
        { route: "/profile", text: "Profile", src: "/assets/react.svg", alt: "" },
    ];
    return (
        <aside className="side-navigation">
            <nav className="side-navigation__wrapper">
                <ul className="side-navigation__list">
                    {routes.map((route) => (
                        <li className="side-navigation__list-item" key={route.route}>
                            <Link className="side-navigation__link" to={route.route}>
                                <img className="side-navigation__link-icon" src={route.src} alt={route.alt} />
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
