import CtaButton from "../../components/CtaButton/CtaButton";
import "./serverErrorPage.css";
const ServerErrorPage: React.FC = () => {
    return (
        <main className="shared-page-style">
            <div className="server-error-page wrapper--max-width">
                <h1 className="server-error-page__title">SERVER ERROR</h1>
                <CtaButton text="GO HOME" onClick={() => console.log("GO HOME")} />
            </div>
        </main>
    );
};

export default ServerErrorPage;
