import { apiClient } from "../../../api/client"
import type { ProcessResponse } from "../types/processResponse";

export const processInput = async (input:string, apiKey:string): Promise<ProcessResponse> => {
    const response = await apiClient("/process", {
        method: "POST",
        headers: {
            "x-api-key": apiKey,
        },
        body: JSON.stringify({input})
    })

    if (!response.ok) {
        throw new Error("Failed to process input")
    }

    return response.json();
}