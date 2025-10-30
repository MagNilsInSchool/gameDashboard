import "./ctaButton.css";

interface Props {
    text: string;
    onClick?: () => void;
    size?: "small" | "medium" | "large" | "giant";
    color?: "light" | "dark";
    disabled?: boolean;
    className?: string;
}
const CtaButton: React.FC<Props> = ({ text, onClick, size = "medium", color = "light", className = "", disabled }) => {
    return (
        <button
            className={`cta-button cta-button--${size} cta-button--${color} ${className}`}
            onClick={onClick}
            disabled={disabled}>
            {text}
        </button>
    );
};

export default CtaButton;
