import { create } from "zustand";
import type { iGame } from "../interfaces/game";

interface GamesStore {
    games: iGame[];
    setGames: (games: iGame[] | ((prev: iGame[]) => iGame[])) => void;
    activeGame: iGame | null;
    setActiveGame: (game: iGame | null | ((prev: iGame | null) => iGame | null)) => void;
}
const useGamesStore = create<GamesStore>((set) => ({
    games: [
        { id: 1, title: "Beantown", normalizedTitle: "beantown" },
        { id: 2, title: "Revenge of beans!", normalizedTitle: "revenge of beans!" },
        { id: 3, title: "Can it be beans?", normalizedTitle: "can it be beans?" },
        { id: 4, title: "Are you kidney beans?", normalizedTitle: "are you kidney beans?" },
        { id: 5, title: "Bunda bean", normalizedTitle: "bunda bean" },
        { id: 6, title: "Grand theft bean", normalizedTitle: "grand theft bean" },
        { id: 7, title: "A can of beans", normalizedTitle: "a can of beans" },
        { id: 8, title: "Beantown 2", normalizedTitle: "bantown 2" },
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
