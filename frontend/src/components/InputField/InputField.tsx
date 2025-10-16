import "./inputField.css";
interface Props {
    name: string;
    placeholder: string;
    labelText: string;
    type?: "text" | "email";
    autoComplete?: "off" | "given-name" | "family-name" | "email";
}
const InputField: React.FC<Props> = ({ name, placeholder, labelText, type = "text", autoComplete = "off" }) => {
    return (
        <label htmlFor={name} className="input-field">
            {labelText}
            <input
                className="input-field__input"
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                autoComplete={autoComplete}
                min={2}
                max={30}
                required
            />
        </label>
    );
};

export default InputField;
