import { useQuery } from "@tanstack/react-query"
import { getAnalyticsTimeseries } from "../api/analyticsApi"

export const useAnalyticsTimeseries = () => {
    return useQuery({
        queryKey: ['analyticsTimeseries'],
        queryFn: getAnalyticsTimeseries,
    })
}