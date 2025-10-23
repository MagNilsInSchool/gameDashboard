import { useForm } from "@tanstack/react-form";
import { userCreationSchema, type iUserRegistration } from "../../schemas/userSchemas";
import CtaButton from "../CtaButton/CtaButton";
import ImgSelector from "../ImgSelector/ImgSelector";
import InputField from "../InputField/InputField";
import "./userRegistrationForm.css";
import { useQueryClient } from "@tanstack/react-query";
import { useRegisterUser } from "../../api/mutations/users/useUsers";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/stringFormat";

const UserRegistrationForm: React.FC = () => {
    const queryClient = useQueryClient();
    const registerUserMutation = useRegisterUser();
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        } as iUserRegistration,
        validators: {
            onChange: userCreationSchema,
        },
        onSubmit: async ({ formApi, value }) => {
            value.firstName = capitalizeFirstLetter(value.firstName);
            value.lastName = capitalizeFirstLetter(value.lastName);
            await registerUserMutation.mutateAsync(value);

            await queryClient.invalidateQueries({ queryKey: ["users"] });
            formApi.reset();

            navigate("/");
        },

        onSubmitInvalid({ formApi }) {
            const errorMap = formApi.state.errorMap.onChange!;
            const inputs = Array.from(document.querySelectorAll("#registerForm input")) as HTMLInputElement[];

            let firstInput: HTMLInputElement | undefined;
            for (const input of inputs) {
                if (!!errorMap[input.name]) {
                    firstInput = input;
                    break;
                }
            }
            firstInput?.focus();
        },
    });

    return (
        <form
            id="registerForm"
            className="user-registration-form"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}>
            <div className="user-registration-form__inner-wrapper">
                <form.Field
                    name="email"
                    children={({ name, state, handleChange }) => (
                        <InputField
                            labelText="Email address *"
                            name={name}
                            value={state.value}
                            onChange={(e) => handleChange(e.target.value)}
                            type="text"
                            placeholder="example@example.com"
                            autoComplete="email"
                            errorMessage={
                                state.meta.errors.length > 0 && state.meta.isTouched
                                    ? state.meta.errors[0]?.message
                                    : ""
                            }
                        />
                    )}
                />

                <form.Field
                    name="firstName"
                    children={({ name, state, handleChange }) => (
                        <InputField
                            labelText="First name *"
                            placeholder="Name"
                            name={name}
                            value={state.value}
                            onChange={(e) => handleChange(e.target.value)}
                            autoComplete="given-name"
                            errorMessage={
                                state.meta.errors.length > 0 && state.meta.isTouched
                                    ? state.meta.errors[0]?.message
                                    : ""
                            }
                        />
                    )}
                />
                <form.Field
                    name="lastName"
                    children={({ name, state, handleChange }) => (
                        <InputField
                            labelText="Last name *"
                            placeholder="Nameson"
                            name={name}
                            value={state.value}
                            onChange={(e) => handleChange(e.target.value)}
                            autoComplete="family-name"
                            errorMessage={
                                state.meta.errors.length > 0 && state.meta.isTouched
                                    ? state.meta.errors[0]?.message
                                    : ""
                            }
                        />
                    )}
                />
                <div className="user-registration-form__row-wrapper">
                    <ImgSelector />
                    <form.Subscribe
                        selector={(state) => [state.isSubmitting]}
                        children={([isSubmitting]) => (
                            <CtaButton
                                text={isSubmitting ? "SUBMITTING..." : "REGISTER"}
                                className="user-registration-form__submit-button"
                                disabled={isSubmitting}
                            />
                        )}
                    />
                </div>
            </div>
        </form>
    );
};

export default UserRegistrationForm;
