import { apiClient } from "../../../api/client";
import type { ApiKeyResponse } from "../types/apiKeyResponse";


export const createApiKey = async (): Promise<ApiKeyResponse> => {

    const response = await apiClient("/api-keys", {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Failed to create key")
    }

    return response.json();
}

export const getApiKeys = async (): Promise<ApiKeyResponse[]> => {
    const response = await apiClient(
        "/api-keys",
        {
            method: "GET"
        }
    );
    if (!response.ok) {
        throw new Error("Failed to get keys")
    }
    return response.json();
}

export const deleteApiKey = async (id:string) => {
    const response = await apiClient(`/api-keys/${id}`,{
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete key");
    }

    if (response.status === 204) {
        return;
    }
    
    return response.json();
}


