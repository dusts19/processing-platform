import { apiClient } from "./client"

export const processInput = async (input:string, apiKey:string) => {
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