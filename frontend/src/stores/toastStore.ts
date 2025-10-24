import { create } from "zustand";
interface iToastInfo {
    message: string;
    type: "success" | "error" | "info";
    duration?: number;
}
interface ToastStore {
    toastInfo: iToastInfo | null;
    setToastInfo: (info: iToastInfo | null | ((prev: iToastInfo | null) => iToastInfo | null)) => void;
}

const useToastStore = create<ToastStore>((set) => ({
    toastInfo: null,
    setToastInfo: (info: iToastInfo | null | ((prev: iToastInfo | null) => iToastInfo | null)) =>
        set((state) => ({
            toastInfo:
                typeof info === "function"
                    ? (info as (prev: iToastInfo | null) => iToastInfo | null)(state.toastInfo)
                    : info,
        })),
}));

export default useToastStore;
