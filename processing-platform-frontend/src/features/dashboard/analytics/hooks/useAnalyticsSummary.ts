import { useQuery } from "@tanstack/react-query"
import { getAnalyticsSummary } from "../api/analyticsApi"
// import type { AnalyticsSummaryResponse } from "../types/analyticsSummaryResponse"

export const useAnalyticsSummary = () => {
    return useQuery({
        queryKey:['analyticsSummary'],
        queryFn: getAnalyticsSummary,
    })
}