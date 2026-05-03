// import { useEffect, useState } from "react";
import type { RequestLogResponse } from "../types/requestLogResponse";
import { getRequestLogs } from "../api/dashboardApi";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { Table } from "../components/ui/Table";
import { Card } from "../components/ui/Card";


const DashboardPage = () => {
    
    const {
        data: logs = [],
        isLoading,
        error: queryError,
    } = useQuery<RequestLogResponse[]>({
        queryKey: ['requestLogs'],
        queryFn: getRequestLogs,
        refetchInterval: 5000,
    })

    if (isLoading) {
        return(
            <div className="p-6 flex justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (queryError instanceof Error) {
        return(
            <div className="p-6">
                <ErrorMessage message={getErrorMessage(queryError)} />
            </div>
        )
    }

    return(
        <div className="p-6 w-full">
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <Card title="Request Logs">
                    {logs.length === 0 ? (
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
                
            </div>
        </div>
    )
}


export default DashboardPage;