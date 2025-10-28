import { create } from "zustand";
export interface iToastInfo {
    message: string;
    type: "success" | "error" | "info";
    duration?: number;
}

export type iToastInfoSetter = (info: iToastInfo | null | ((prev: iToastInfo | null) => iToastInfo | null)) => void;
interface ToastStore {
    toastInfo: iToastInfo | null;
    setToastInfo: iToastInfoSetter;
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
