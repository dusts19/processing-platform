import { apiClient } from "../../../../api/client";
import type { AnalyticsSummaryResponse } from "../types/analyticsSummaryResponse";
import type { AnalyticsTimeseriesResponse } from "../types/analyticsTimeseriesResponse";

export const getAnalyticsSummary = async (): Promise<AnalyticsSummaryResponse> => {
    const response = await apiClient("/analytics/summary", {
        method: "GET",
    })

    if (!response.ok) {
        throw new Error("Failed to get summary")
    }
    return response.json();
}

export const getAnalyticsTimeseries = async (): Promise<AnalyticsTimeseriesResponse[]>  => {
    const response = await apiClient("/analytics/timeseries",{
        method: "GET",
    })

    if (!response.ok) {
        throw new Error("Failed to get timeseries")
    }
    return response.json();
}