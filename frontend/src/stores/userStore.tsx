import { create } from "zustand";
import type { iUser } from "../interfaces/user";

interface UserStore {
    activeUser: iUser | null;
    setActiveUser: (user: iUser | null | ((prev: iUser | null) => iUser | null)) => void;
}
const useUserStore = create<UserStore>((set) => ({
    activeUser: null,
    setActiveUser: (value) =>
        set((state) => ({
            activeUser:
                typeof value === "function" ? (value as (prev: iUser | null) => iUser | null)(state.activeUser) : value,
        })),
}));

export default useUserStore;
