import useToastStore from "../../stores/toastStore";
import "./toast.css";
interface Props {
    message: string;
    type: "success" | "error" | "info";
    duration?: number;
}
const Toast = ({ message, type, duration = 5 }: Props) => {
    const { setToastInfo } = useToastStore();
    const iconSrc =
        type === "success"
            ? "/assets/icons/success.svg"
            : type === "error"
            ? "/assets/icons/error.svg"
            : "/assets/icons/info.svg";
    return (
        <article className={`toast toast--${type}`} onClick={() => setToastInfo(null)}>
            <img src={iconSrc} alt={`Showing the sign for ${type}`} className="toast__icon" />
            <p className="toast__message">{message}</p>
            <div className="toast__timer" style={{ animationDuration: `${duration}s` }}></div>
        </article>
    );
};

export default Toast;
