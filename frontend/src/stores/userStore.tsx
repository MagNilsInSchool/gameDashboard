import { create } from "zustand";
import type { iUser } from "../interfaces/user";

interface UserStore {
    user: iUser;
    setUser: (user: iUser | ((prev: iUser) => iUser)) => void;
}
const useUserStore = create<UserStore>((set) => ({
    user: {
        id: 1,
        firstName: "string",
        lastName: "string",
        normalizedName: "string string",
        email: "string@string.se",
    },
    setUser: (value) =>
        set((state) => ({
            user: typeof value === "function" ? value(state.user) : value,
        })),
}));

export default useUserStore;
