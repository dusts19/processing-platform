import { useQuery } from "@tanstack/react-query"
import { getRequestLogs } from "../api/requestLogApi"

export const useRequestLogs = (page: number, status?: string, sort: string = "createdAt,desc") => {
    
    return useQuery({
        queryKey: ['requestLogs', page, status, sort],
        queryFn: () => getRequestLogs({
            page,
            size: 10,
            status,
            sort,
        }),
        // refetchInterval: 5000,
    })
}