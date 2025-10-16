import UserRegistrationForm from "../../components/UserRegistrationForm/UserRegistrationForm";
import "./registerUserPage.css";

const RegisterUserPage = () => {
    return (
        <main className="shared-page-style">
            <div className="register-user-page wrapper--max-width">
                <UserRegistrationForm />
            </div>
        </main>
    );
};

export default RegisterUserPage;
