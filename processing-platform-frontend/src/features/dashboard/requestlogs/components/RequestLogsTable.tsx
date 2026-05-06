
import { Card } from "../../../../components/ui/Card"
import LoadingSpinner from "../../../../components/shared/LoadingSpinner"
import { ErrorMessage } from "../../../../components/shared/ErrorMessage"
import { Table } from "../../../../components/ui/Table"
import { getErrorMessage } from "../../../../components/shared/apiError"
import { useRequestLogs } from "../hooks/useRequestLogs"
import type { RequestLogResponse } from "../types/requestLogResponse"

export const RequestLogsTable = () => {
    
    const {
        data: logs = [],
        isLoading: isLoading,
        error: error,
    } = useRequestLogs();
    
    return (
        <Card title="Request Logs">
            {isLoading ? (
                <div className="p-6 flex justify-center">
                    <LoadingSpinner />
                </div>
            ) : error instanceof Error ? (
                <div className="p-6">
                    <ErrorMessage message={getErrorMessage(error)} />
                </div>
            ) : logs.length === 0 ? (
                <p className="text-gray-500">No logs yet</p>
            ) : (
                    <Table headers={["Method", "Endpoint", "Status", "Latency", "Time"]}>
                        {logs.map((log: RequestLogResponse) => (
                            <tr  
                                className="border-t hover:bg-gray-50" 
                                key={log.id}
                            >
                                <td className="p-3 text-sm">{log.httpMethod}</td>
                                <td className="p-3 text-sm">{log.endpoint}</td>
                                <td className={`p-3 text-sm ${
                                        log.statusCode >= 400 ? "text-red-500" : "text-green-600" 
                                    }`}
                                >
                                    {log.statusCode} - {log.status}
                                </td>
                                <td className="p-3 text-sm">{log.latencyMs.toFixed(2)} ms</td>
                                <td className="p-3 text-sm">
                                    {log.createdAt
                                    ? new Date(log.createdAt).toLocaleDateString()
                                    : "---"}
                                </td>
                            </tr>
                        ))}
                    </Table>
                )
            }
        </Card>
    )
}