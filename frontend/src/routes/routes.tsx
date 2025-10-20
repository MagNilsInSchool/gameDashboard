import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import GamesPage from "../pages/GamesPage/GamesPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import PlayingPage from "../pages/PlayingPage/PlayingPage";
import RegisterUserPage from "../pages/RegisterUserPage/RegisterUserPage";

const RoutesComponent: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/play/:id" element={<PlayingPage />} />
            <Route path="/users/register" element={<RegisterUserPage />} />
            <Route path="/users/:id" element={<ProfilePage />} />
        </Routes>
    );
};
export default RoutesComponent;
