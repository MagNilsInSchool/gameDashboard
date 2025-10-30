import "./inputField.css";
interface Props {
    name: string;
    placeholder: string;
    labelText: string;
    type?: "text" | "email";
    autoComplete?: "off" | "given-name" | "family-name" | "email";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
}
const InputField: React.FC<Props> = ({
    name,
    placeholder,
    labelText,
    type = "text",
    autoComplete = "off",
    value,
    onChange,
    errorMessage,
}) => {
    return (
        <label htmlFor={name} className="input-field">
            {labelText}
            <input
                className="input-field__input"
                type={type}
                name={name}
                id={name}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                value={value}
            />
            {errorMessage && <p className="input-field__error">{errorMessage}</p>}
        </label>
    );
};

export default InputField;
