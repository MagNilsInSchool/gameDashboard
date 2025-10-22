import axios from "axios";
import type { NavigateFunction } from "react-router-dom";

export const handleApiError = (err: unknown, navigate: NavigateFunction) => {
    if (axios.isAxiosError(err) && !err.response) {
        navigate("/offline");
        return;
    }

    if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        if (status >= 500) {
            navigate("/server-error");
            return;
        }
        return;
    }

    const status = (err as any)?.status;
    if (typeof status === "number" && status >= 500) {
        navigate("/server-error");
        return;
    }
};

type ApiErrorWithStatus = Error & { status?: number };

export const throwApiError = (message: string, status: number): never => {
    const error: ApiErrorWithStatus = new Error(message);
    error.status = status;
    throw error;
};
