
import { Card } from "../../../../components/ui/Card"
import LoadingSpinner from "../../../../components/shared/LoadingSpinner"
import { ErrorMessage } from "../../../../components/shared/ErrorMessage"
import { Table } from "../../../../components/ui/Table"
import { getErrorMessage } from "../../../../components/shared/apiError"
import { useRequestLogs } from "../hooks/useRequestLogs"
import type { RequestLogResponse } from "../types/requestLogResponse"
import Button from "../../../../components/ui/Button"
import { useState } from "react"

export const RequestLogsTable = () => {
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState("");
    
    const {
        data,
        isLoading,
        isError,
        error,
    } = useRequestLogs(page, status);
    
    const logs = data?.content ?? [];
    const totalPages = data?.totalPages ?? 0;
    
    
    if (isLoading){
        return (
            <Card title="Request Logs">
                <div className="p-6 flex justify-center">
                    <LoadingSpinner />
                </div>
            </Card>
        )
    }
    if (isError) {
        return (
            <Card title="Request Logs">
                <div className="p-6 flex justify-center">
                    <ErrorMessage message={getErrorMessage(error)}/>
                </div>
            </Card>
        )
    }

    const isEmpty = logs.length === 0;
    const hasPages = totalPages > 0;

    return (
        <Card title="Request Logs">
            {isEmpty ?(
                <p className="p-4 text-gray-500">No request logs yet</p>
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
            )}
            
            <div className="flex items-center justify-between mt-4">
                <Button
                    disabled={page === 0 || !hasPages}
                    onClick={() =>setPage((p) => p - 1)}
                >
                    Previous
                </Button>
                
                <span>
                    Page {hasPages ? page + 1 : 0} of {totalPages}
                </span>
                
                <Button 
                    disabled={!hasPages || page + 1 >= totalPages}
                    onClick={() =>setPage((p) => p + 1)}
                >
                    Next
                </Button>
            </div>
            <div className="mt-4">
                <select
                    value={status ?? ""}
                    onChange={(e) => {
                        setStatus(e.target.value)
                        setPage(0);
                    }}
                >
                    <option value="">All</option>
                    <option value="SUCCESS">Success</option>
                    <option value="ERROR">Error</option>
                </select>
            </div>
        </Card>
    )
}