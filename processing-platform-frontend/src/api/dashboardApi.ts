import { apiClient } from "./client"

export const getRequestLogs = async () => {
    const response = await apiClient("/requests",{
        method: "GET",
    })
    
    if (!response.ok) {
        throw new Error("Failed to get logs")
    }
    return response.json();
}

export const getAnalyticsSummary = async () => {
    const response = await apiClient("/analytics/summary", {
        method: "GET",
    })

    if (!response.ok) {
        throw new Error("Failed to get summary")
    }
    return response.json();
}