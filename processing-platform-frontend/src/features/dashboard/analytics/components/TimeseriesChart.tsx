import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getErrorMessage } from "../../../../components/shared/apiError";
import { ErrorMessage } from "../../../../components/shared/ErrorMessage";
// import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import { Card } from "../../../../components/ui/Card";
import { useAnalyticsTimeseries } from "../hooks/useAnalyticsTimeseries";
import { selectChartData } from "../types/analyticsTimeseriesSelector";
// import type { AnalyticsTimeseriesResponse } from "../types/analyticsTimeseriesResponse";

export const TimeseriesChart = () => {
    const { data = [], isLoading, isError, error } = useAnalyticsTimeseries();
    
    const chartData = selectChartData(data);
    
    const isEmpty = data.length === 0;

    if (isLoading){
        return (
            <Card title="Request Trends">
                <div className="p-6 flex justify-center">
                    <div className="h-40 bg-gray-100 animate-pulse rounded" />
                </div>
            </Card>
        )
    }
    
    if (isError) {
        return (
            <Card title="Request Trends">
                <div className="p-6 flex justify-center">
                    <ErrorMessage message={getErrorMessage(error)}/>
                </div>
            </Card>
        )
    }


    if (isEmpty) {
        return (
            <Card title="Request Trends">
                <p className="p-4 text-gray-500">
                    No timeseries data yet
                </p>
            </Card>
        )
    }
    return (
            <Card title="Request Trends">
                <div className="w-full h-80">

                    <div className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date"/>
                                <YAxis 
                                    label={{ value: "Requests", angle: -90, position: "insideLeft" }}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: "8px" }}
                                    labelStyle={{ color: "#666" }}
                                />
                                <Line 
                                    type="monotone"
                                    dataKey="requestCount"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
    
            </Card>
        )
}