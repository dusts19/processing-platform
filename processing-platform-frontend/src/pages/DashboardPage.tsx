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
        <div>
            {loading && <p>{loading}</p>}
            <ErrorMessage message={error}/>

            {!loading && logs.length === 0 && <p>No logs yet</p>}

            <table>
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Endpoint</th>
                        <th>Status</th>
                        <th>Latency</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.httpMethod}</td>
                            <td>{log.endpoint}</td>
                            <td style={{color: log.statusCode >= 400 ? "red" : "green" }}>
                                {log.statusCode} - {log.status}
                            </td>
                            <td>{log.latencyMs} ms</td>
                            <td>
                                {log.createdAt
                                ? new Date(log.createdAt).toLocaleDateString()
                                : "---"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            
        </div>
    )
}


export default DashboardPage;