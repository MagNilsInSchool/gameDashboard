import axios from "axios";
import type { iUser, iUserResponse, iUsersResponse } from "../../interfaces/user";
import type { ApiSuccess } from "../../interfaces/response";
import { throwApiError } from "../errorHandler/handleApiErrors";

const BASE_URL = "http://localhost:1338/users";

const getUsers = async (normalizedName?: string): Promise<iUser[]> => {
    //force error:
    // normalizedName = "sq2dfs";
    const response = await axios.get<iUsersResponse>(BASE_URL, {
        params: normalizedName ? { normalizedName } : undefined,
        validateStatus: () => true,
    });

    const result = response.data;
    if (!result.success) {
        console.error("getUsers API error:", result.message);
        throwApiError(result.message, response.status);
    }
    return (result as ApiSuccess<iUser[]>).data;
};

const getUser = async (id: number): Promise<iUser> => {
    if (!id || Number.isNaN(id)) throwApiError("Invalid id.", 400);
    const response = await axios.get<iUserResponse>(`${BASE_URL}/${id}`, {
        validateStatus: () => true,
    });

    const result = response.data;
    if (!result.success) {
        console.error("getUser API error:", result.message);
        throwApiError(result.message, response.status);
    }
    return (result as ApiSuccess<iUser>).data;
};
export { getUsers, getUser };
