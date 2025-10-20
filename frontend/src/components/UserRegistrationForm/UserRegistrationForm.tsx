import CtaButton from "../CtaButton/CtaButton";
import ImgSelector from "../ImgSelector/ImgSelector";
import InputField from "../InputField/InputField";
import "./userRegistrationForm.css";

const UserRegistrationForm: React.FC = () => {
    return (
        <form
            className="user-registration-form"
            onSubmit={(e) => {
                e.preventDefault();
                console.log("Submitted form.");
            }}>
            <div className="user-registration-form__inner-wrapper">
                <InputField
                    labelText="Email address *"
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                    autoComplete="email"
                />
                <InputField labelText="First name *" name="firstName" placeholder="Name" autoComplete="given-name" />
                <InputField labelText="Last name *" name="LastName" placeholder="Nameson" autoComplete="family-name" />
                <div className="user-registration-form__row-wrapper">
                    <ImgSelector />
                    <CtaButton
                        text="REGISTER"
                        onClick={() => console.log("Registerbutton pressed")}
                        className="user-registration-form__submit-button"
                    />
                </div>
            </div>
        </form>
    );
};

export default UserRegistrationForm;
