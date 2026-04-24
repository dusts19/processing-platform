import type { RequestLogResponse } from "../types/requestLogResponse";


const DashboardPage = () => {
    const logs: RequestLogResponse[] = [];
    
    return(
        <div>
            <ul>{logs.map((log) => (
                <li key={log.id}>
                    {log.endpoint} - {log.status}
                </li>
            ))}</ul>
            
        </div>
    )
}


export default DashboardPage;