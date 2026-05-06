import { useQuery } from "@tanstack/react-query"
import { getApiKeys } from "../api/apiKeyApi"

export const useGetApiKeys = () => {

    return useQuery({
        queryKey: ['apiKeys'],
        queryFn: getApiKeys
    })
}