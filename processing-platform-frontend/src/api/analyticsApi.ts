import { apiClient } from "./client"

// export const getRequestLogs = async () => {
//     const response = await apiClient("/requests",{
//         method: "GET",
//     })
    
//     if (!response.ok) {
//         throw new Error("Failed to get logs")
//     }
//     return response.json();
// }

export const getAnalyticsSummary = async () => {
    const response = await apiClient("/analytics/summary", {
        method: "GET",
    })

    if (!response.ok) {
        throw new Error("Failed to get summary")
    }
    return response.json();
}

export const getAnalyticsTimeseries = async () => {
    const response = await apiClient("/analytics/timeseries",{
        method: "GET",
    })

    if (!response.ok) {
        throw new Error("Failed to get timeseries")
    }
    return response.json();
}