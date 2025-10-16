import "./ctaButton.css";

interface Props {
    text: string;
    onClick: () => void;
    size?: "small" | "medium" | "large" | "giant";
    color?: "light" | "dark";
}
const CtaButton: React.FC<Props> = ({ text, onClick, size = "medium", color = "light" }) => {
    return (
        <button className={`cta-button cta-button--${size} cta-button--${color}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default CtaButton;
