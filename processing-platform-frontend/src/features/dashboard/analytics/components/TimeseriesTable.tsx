import { getErrorMessage } from "../../../../components/shared/apiError";
import { ErrorMessage } from "../../../../components/shared/ErrorMessage";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import { Card } from "../../../../components/ui/Card"
import { Table } from "../../../../components/ui/Table";
import { useAnalyticsTimeseries } from "../hooks/useAnalyticsTimeseries"
import type { AnalyticsTimeseriesResponse } from "../types/analyticsTimeseriesResponse";

export const TimeseriesTable = () => {
    const {
        data: timeseries = [],
        isLoading: isTimeseriesLoading,
        error: timeseriesError,
    } = useAnalyticsTimeseries();


    return(
        <Card title="Timeseries Data">
                    {isTimeseriesLoading ? (
                        <div className="p-6 flex justify-center">
                            <LoadingSpinner/>
                        </div>
                    ) : timeseriesError instanceof Error ? (
                        <div className="p-6">
                            <ErrorMessage message={getErrorMessage(timeseriesError)}/>
                        </div>
                    ) : (
                        <Table headers={["Date", "Requests", "Success", "Avg Latency"]}>
                            {timeseries && timeseries.map((d:AnalyticsTimeseriesResponse)=> (
                                <tr key={d.seriesDate.toString()} className="border-t hover:bg-gray-50">
                                        <td className="p-3 text-sm">{new Date(d.seriesDate).toLocaleDateString()}</td>
                                        <td className="p-3 text-sm">{d.requestCount}</td>
                                        <td className="p-3 text-sm text-green-600">{d.successCount}</td>
                                        <td className="p-3 text-sm">{d.avgLatency.toFixed(2)} ms</td>
                                </tr>
                            ))}
                                
                        </Table>)
                    }
                </Card>
    )
}