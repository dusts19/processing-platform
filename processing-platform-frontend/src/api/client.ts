const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = async (
    endpoint: string,
    options: RequestInit = {}
) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            }
        }
    );
    return response;
};