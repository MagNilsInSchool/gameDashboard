import { useNavigate } from "react-router-dom";
import CtaButton from "../../components/CtaButton/CtaButton";
import "./offlinePage.css";
const OfflinePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <main className="shared-page-style">
            <div className="offline-page wrapper--max-width">
                <h1 className="offline-page__title">SERVER IS OFFLINE!</h1>
                <CtaButton text="RETRY" onClick={() => navigate(-1)} />
            </div>
        </main>
    );
};

export default OfflinePage;
