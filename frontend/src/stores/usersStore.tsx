import { create } from "zustand";

interface Game {
    id: number;
    src: string;
    title: string;
}
interface User {
    id: number;
    firstName: string;
    lastName: string;
    src: string;
}
interface UsersStore {
    user: User;
    setUser: (user: User | ((prev: User) => User)) => void;
    games: Game[];
    setGames: (games: Game[] | ((prev: Game[]) => Game[])) => void;
}
const useUsersStore = create<UsersStore>((set) => ({
    user: { id: 1, firstName: "Bean", lastName: "Beanarius", src: "/assets/icons/user-filled.svg" },
    setUser: (value) =>
        set((state) => ({
            user: typeof value === "function" ? value(state.user) : value,
        })),
    games: [
        { id: 1, title: "Beantown", src: "/assets/icons/game-logo.svg" },
        { id: 2, title: "Revenge of beans!", src: "/assets/icons/game-logo.svg" },
        { id: 3, title: "Can it be beans?", src: "/assets/icons/game-logo.svg" },
        { id: 4, title: "Are you kidney beans?", src: "/assets/icons/game-logo.svg" },
        { id: 5, title: "Bunda bean", src: "/assets/icons/game-logo.svg" },
        { id: 6, title: "Grand theft bean", src: "/assets/icons/game-logo.svg" },
        { id: 7, title: "A can of beans", src: "/assets/icons/game-logo.svg" },
        { id: 8, title: "Beantown 2", src: "/assets/icons/game-logo.svg" },
    ],
    setGames: (value) =>
        set((state) => ({
            games: typeof value === "function" ? value(state.games) : value,
        })),
}));

export default useUsersStore;
