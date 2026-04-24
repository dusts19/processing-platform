import { useEffect, useState } from "react";
import type { RequestLogResponse } from "../types/requestLogResponse";
import { getRequestLogs } from "../api/dashboardApi";


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
            } catch {
                setError("Failed to fetch logs")
            } finally {
                setLoading(false);
            }
        };
        
        fetchLogs();
    }, [])

    return(
        <div>
            {loading && <p>{loading}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && logs.length === 0 && <p>No logs yet</p>}

            <ul>{logs.map((log) => (
                <li key={log.id}>
                    {log.endpoint} - {log.status}
                </li>
            ))}</ul>
            
        </div>
    )
}


export default DashboardPage;