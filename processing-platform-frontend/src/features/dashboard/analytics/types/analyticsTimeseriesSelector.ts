import type { AnalyticsTimeseriesResponse } from "./analyticsTimeseriesResponse";
import { format } from "date-fns";


export const selectChartData = (data: AnalyticsTimeseriesResponse[]) => {
    return data.map((d) => ({
        date: format(new Date(d.seriesDate), "MMM d"),
        requestCount: d.requestCount,
    }));
};

export const selectTableData = (data: AnalyticsTimeseriesResponse[]) => {
    return data.map((d) => ({
        ...d,
        formattedDate: format(new Date(d.seriesDate), "yyyy-MM-dd"),
    }));
};