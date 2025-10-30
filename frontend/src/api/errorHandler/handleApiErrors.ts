import axios from "axios";
import type { NavigateFunction } from "react-router-dom";
import { type iToastInfoSetter } from "../../stores/toastStore";

export type ApiErrorWithStatus = Error & { status?: number };

export const handleApiError = (err: unknown, navigate: NavigateFunction, setToastInfo: iToastInfoSetter) => {
    if (axios.isAxiosError(err) && !err.response) {
        setToastInfo({ message: "Server is offline!", type: "error" });
        navigate("/offline");
        return;
    }

    if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        if (status >= 500) {
            setToastInfo({ message: "Server error!", type: "error" });
            navigate("/server-error");
            return;
        }
        return;
    }

    const customError = err as ApiErrorWithStatus;
    if (typeof customError.status === "number") {
        if (customError.status >= 500) {
            setToastInfo({ message: "Server error!", type: "error" });
            navigate("/server-error");
            return;
        }
        setToastInfo({ message: customError.message, type: "error" });
        return;
    }
};

export const throwApiError = (message: string, status: number): never => {
    const error: ApiErrorWithStatus = new Error(message);
    error.status = status;
    throw error;
};
