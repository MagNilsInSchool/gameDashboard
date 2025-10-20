import { create } from "zustand";
import type { iUser } from "../interfaces/users";

interface UserStore {
    user: iUser;
    setUser: (user: iUser | ((prev: iUser) => iUser)) => void;
}
const useUserStore = create<UserStore>((set) => ({
    user: { id: 1, firstName: "Bean", lastName: "Beanarius", src: "/assets/icons/user-filled.svg" },
    setUser: (value) =>
        set((state) => ({
            user: typeof value === "function" ? value(state.user) : value,
        })),
}));

export default useUserStore;
