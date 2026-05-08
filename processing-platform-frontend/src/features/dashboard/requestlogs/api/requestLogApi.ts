import { apiClient } from "../../../../api/client";
import type { PaginatedResponse } from "../types/paginatedResponse";
import type { RequestLogResponse } from "../types/requestLogResponse";

export const getRequestLogs = async ({
    page,
    size,
    status,
    sort,
}: {
    page: number;
    size: number;
    status?: string;
    sort: string;
}): Promise<PaginatedResponse<RequestLogResponse>> => {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("size", size.toString());
    params.set("sort", sort);
    

    if (status) {
        params.set("status", status);
    }

    const response = await apiClient(`/requests?${params.toString()}`,{
        method: "GET",
    })
    
    if (!response.ok) {
        throw new Error("Failed to get logs")
    }
    return response.json();
}