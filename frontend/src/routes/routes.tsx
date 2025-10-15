import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";

const RoutesComponent: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
        </Routes>
    );
};
export default RoutesComponent;
