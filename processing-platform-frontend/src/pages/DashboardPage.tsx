import { useEffect, useState } from "react";
import type { RequestLogResponse } from "../types/requestLogResponse";
import { getRequestLogs } from "../api/dashboardApi";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";


const DashboardPage = () => {
    const [logs, setLogs] = useState<RequestLogResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchLogs = async () => {

            setLoading(true);
            setError("");

            try {
                const data = await getRequestLogs();
                setLogs(data)
            } catch (err) {
                setError(getErrorMessage(err))
            } finally {
                setLoading(false);
            }
        };
        
        fetchLogs();
    }, [])

    return(
        <div className="p-6 w-full">
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                {loading && <p>Loading...</p>}
                <ErrorMessage message={error}/>

                {!loading && logs.length === 0 && <p className="text-gray-500">No logs yet</p>}

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