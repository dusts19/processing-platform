import { useQuery } from "@tanstack/react-query"
import { getRequestLogs } from "../api/requestLogApi"

export const useRequestLogs = (page: number, status: string) => {
    
    return useQuery({
        queryKey: ['requestLogs', page, status],
        queryFn: () => getRequestLogs({ page, size: 10, status}),
        // refetchInterval: 5000,
    })
}