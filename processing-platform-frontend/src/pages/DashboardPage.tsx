// import { useEffect, useState } from "react";
import type { RequestLogResponse } from "../types/requestLogResponse";
import { getAnalyticsSummary, getRequestLogs } from "../api/dashboardApi";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { Table } from "../components/ui/Table";
import { Card } from "../components/ui/Card";
import type { AnalyticsSummaryResponse } from "../types/analyticsSummaryResponse";


const DashboardPage = () => {
    
    const {
        data: logs = [],
        isLoading: isLogsLoading,
        error: logsError,
    } = useQuery<RequestLogResponse[]>({
        queryKey: ['requestLogs'],
        queryFn: getRequestLogs,
        // refetchInterval: 5000,
    })

    const {
        data: summary = {
            totalRequests: 0,
            successRate: 0,
            avgLatencyMs: 0,
        },
        isLoading: isSummaryLoading,
        error: summaryError,
    } = useQuery<AnalyticsSummaryResponse>({
        queryKey:['analyticsSummary'],
        queryFn: getAnalyticsSummary,
    })


    return(
        <div className="p-6 w-full">
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <Card title="Request Logs">
                    {isLogsLoading ? (
                        <div className="p-6 flex justify-center">
                            <LoadingSpinner />
                        </div>
                    ) : logsError instanceof Error ? (
                        <div className="p-6">
                            <ErrorMessage message={getErrorMessage(logsError)} />
                        </div>
                    ) : logs.length === 0 ? (
                        <p className="text-gray-500">No logs yet</p>
                    ) : (
                            <Table headers={["Method", "Endpoint", "Status", "Latency", "Time"]}>
                                {logs.map((log) => (
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
                                        <td className="p-3 text-sm">{log.latencyMs} ms</td>
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
                <Card title="Summary">
                    {isSummaryLoading ? (
                        <div className="p-6 flex justify-center">
                            <LoadingSpinner />
                        </div>
                    ) : summaryError instanceof Error ? (
                        <div className="p-6 flex justify-center">
                            <ErrorMessage message={getErrorMessage(summaryError)}/>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p>Total Requests:</p>
                                <p>{summary.totalRequests}</p>
                            </div>
                            <div>
                                <p>Success Rate:</p>
                                <p>{summary.successRate}</p>
                            </div>
                            <div>
                                <p>Avg Latency:</p>
                                <p>{summary.avgLatencyMs}</p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}


export default DashboardPage;