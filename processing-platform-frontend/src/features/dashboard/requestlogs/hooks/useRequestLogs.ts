import { useQuery } from "@tanstack/react-query"
import { getRequestLogs } from "../api/requestLogApi"

export const useRequestLogs = () => {
    
    return useQuery({
        queryKey: ['requestLogs'],
        queryFn: getRequestLogs,
        // refetchInterval: 5000,
    })
}