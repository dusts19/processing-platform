import { getErrorMessage } from "../../../../components/shared/apiError";
import { ErrorMessage } from "../../../../components/shared/ErrorMessage";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import { Card } from "../../../../components/ui/Card"
import { Table } from "../../../../components/ui/Table";
import { useAnalyticsTimeseries } from "../hooks/useAnalyticsTimeseries"
// import type { AnalyticsTimeseriesResponse } from "../types/analyticsTimeseriesResponse";
import { selectTableData } from "../types/analyticsTimeseriesSelector";

export const TimeseriesTable = () => {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useAnalyticsTimeseries();

    
    if (isLoading){
        return (
            <Card title="Timeseries Data">
                <div className="p-6 flex justify-center">
                    <LoadingSpinner />
                </div>
            </Card>
        )
    }
    if (isError) {
        return (
            <Card title="Timeseries Data">
                <div className="p-6 flex justify-center">
                    <ErrorMessage message={getErrorMessage(error)}/>
                </div>
            </Card>
        )
    }

    const tableData = selectTableData(data ?? []);

    return(
        <Card title="Timeseries Data">
            <Table headers={["Date", "Requests", "Success", "Avg Latency"]}>
                {tableData.map((row)=> (
                    <tr key={row.formattedDate} className="border-t hover:bg-gray-50">
                            <td className="p-3 text-sm">{row.formattedDate}</td>
                            <td className="p-3 text-sm">{row.requestCount}</td>
                            <td className="p-3 text-sm text-green-600">{row.successCount}</td>
                            <td className="p-3 text-sm">{row.avgLatency.toFixed(2)} ms</td>
                    </tr>
                ))}
                    
            </Table>
            
        </Card>
    )
}