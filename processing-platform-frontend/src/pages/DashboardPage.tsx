// import { useEffect, useState } from "react";
import type { RequestLogResponse } from "../types/requestLogResponse";
import { getRequestLogs } from "../api/dashboardApi";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";
import { useQuery } from "@tanstack/react-query";


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

    return(
        <div className="p-6 w-full">
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>

                {isLoading && <p>Loading...</p>}

                {queryError instanceof Error &&
                    <ErrorMessage message={getErrorMessage(queryError)}/>
                }

                {!isLoading && logs.length === 0 && 
                    <p className="text-gray-500">No logs yet</p>
                }

                <div className="bg-white rounded-lg shadow">
                    <table className="w-full border-2 border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                            <tr>
                                <th className="text-left p-3">Method</th>
                                <th className="text-left p-3">Endpoint</th>
                                <th className="text-left p-3">Status</th>
                                <th className="text-left p-3">Latency</th>
                                <th className="text-left p-3">Time</th>
                            </tr>
                        </thead>
                        <tbody className="p-2">
                            {logs.map((log) => (
                                <tr  
                                    className="border-t hover:bg-gray-50" 
                                    key={log.id}
                                >
                                    <td className="p-3 text-sm">{log.httpMethod}</td>
                                    <td className="p-3 text-sm">{log.endpoint}</td>
                                    <td className={`p-3 text-sm ${log.statusCode >= 400 ? "text-red-500" : "text-green-600" }`}>
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
                        </tbody>
                    </table>
                </div>

            </div>
            
            
        </div>
    )
}


export default DashboardPage;