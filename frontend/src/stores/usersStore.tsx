import { create } from "zustand";

interface UsersStore {
    user: boolean;
    setUser: (value: boolean | ((prev: boolean) => boolean)) => void;
}
const useUsersStore = create<UsersStore>((set) => ({
    user: false,
    setUser: (value) =>
        set((state) => ({
            user: typeof value === "function" ? value(state.user) : value,
        })),
}));

export default useUsersStore;
