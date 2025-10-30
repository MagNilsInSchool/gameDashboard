import type { iUser } from "../interfaces/user";

export const addItemsToStorage = <T>(key: string, items: T | T[]) => {
    sessionStorage.setItem(key, JSON.stringify(items));
};

export const getActiveUserFromStorage = (): iUser | null => {
    const userInStorage = sessionStorage.getItem("activeUser");

    if (!userInStorage) return null;

    const parsedUserInStorage: iUser = JSON.parse(userInStorage, (key, value) => {
        if ((key === "createdAt" || key === "updatedAt") && typeof value === "string") {
            return new Date(value);
        }
        return value;
    });

    return parsedUserInStorage;
};
