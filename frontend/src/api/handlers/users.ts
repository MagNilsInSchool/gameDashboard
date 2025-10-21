import axios from "axios";
import type { iUser, iUserResponse, iUsersResponse } from "../../interfaces/user";

const BASE_URL = "http://localhost:1338/users";

const getUsers = async (normalizedName?: string): Promise<iUser[] | null> => {
    try {
        const response = await axios.get<iUsersResponse>(BASE_URL, {
            params: normalizedName ? { normalizedName } : undefined,
        });
        const result = response.data;
        if (!result.success) {
            console.error("API error:", result.message);
            return null;
        }
        return result.data;
    } catch (error) {
        console.error("Request failed:", error);
        return null;
    }
};

const getUser = async (id: number): Promise<iUser | null> => {
    try {
        if (!id || Number.isNaN(id)) return null;
        const response = await axios.get<iUserResponse>(`${BASE_URL}/${id}`);
        const result = response.data;
        if (!result.success) {
            console.error("API error:", result.message);
            return null;
        }
        return result.data;
    } catch (error) {
        console.error("Request failed:", error);
        return null;
    }
};
export { getUsers, getUser };
