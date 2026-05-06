import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getErrorMessage } from "../../../../components/shared/apiError";
import { ErrorMessage } from "../../../../components/shared/ErrorMessage";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import { Card } from "../../../../components/ui/Card";
import { useAnalyticsTimeseries } from "../hooks/useAnalyticsTimeseries";
import type { AnalyticsTimeseriesResponse } from "../types/analyticsTimeseriesResponse";

export const TimeseriesChart = () => {
    const { data = [], isLoading, isError, error } = useAnalyticsTimeseries();
    
    if (isLoading){
        return (
            <Card title="summary">
                <div className="p-6 flex justify-center">
                    <LoadingSpinner />
                </div>
            </Card>
        )
    }
    if (isError) {
        return (
            <Card title="summary">
                <div className="p-6 flex justify-center">
                    <ErrorMessage message={getErrorMessage(error)}/>
                </div>
            </Card>
        )
    }

    const chartData = data.map((d: AnalyticsTimeseriesResponse) => ({
        date: new Date(d.seriesDate).toLocaleDateString(),
        requestCount: d.requestCount
    }))
    
    return (
        <Card title="Request Trends">
            <div className="w-full h-75">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date"/>
                        <YAxis />
                        <Tooltip />
                        <Line 
                            type="monotone"
                            dataKey="requestCount"
                            stroke="#3b82f6"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </Card>
    )
}