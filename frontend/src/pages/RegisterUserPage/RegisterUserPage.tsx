import UserRegistrationForm from "../../components/UserRegistrationForm/UserRegistrationForm";
import "./registerUserPage.css";

const RegisterUserPage = () => {
    return (
        <div className="register-user-page wrapper--max-width">
            <UserRegistrationForm />
        </div>
    );
};

export default RegisterUserPage;
