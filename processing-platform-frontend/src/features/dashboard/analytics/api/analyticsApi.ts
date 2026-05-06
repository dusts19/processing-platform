import { apiClient } from "../../../../api/client";

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