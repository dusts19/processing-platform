import { apiClient } from "../../../../api/client";

export const getRequestLogs = async ({
    page,
    size,
    status,
}: {
    page: number;
    size: number;
    status: string;
}) => {
    const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
    });

    if (status) {
        params.append("status", status);
    }

    const response = await apiClient(`/requests?${params.toString()}`,{
        method: "GET",
    })
    
    if (!response.ok) {
        throw new Error("Failed to get logs")
    }
    return response.json();
}