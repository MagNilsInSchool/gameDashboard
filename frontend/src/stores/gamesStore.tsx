import { create } from "zustand";
import type { iGame } from "../interfaces/games";

interface GamesStore {
    games: iGame[];
    setGames: (games: iGame[] | ((prev: iGame[]) => iGame[])) => void;
    activeGame: iGame | null;
    setActiveGame: (game: iGame | null | ((prev: iGame | null) => iGame | null)) => void;
}
const useGamesStore = create<GamesStore>((set) => ({
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
    activeGame: null,
    setActiveGame: (value) =>
        set((state) => ({
            activeGame: typeof value === "function" ? value(state.activeGame) : value,
        })),
}));

export default useGamesStore;
