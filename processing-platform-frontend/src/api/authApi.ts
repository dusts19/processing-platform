import { apiClient } from "./client";

export const register = async (email: string, password: string) => {
    
    const response = await apiClient("/auth/register", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed")
    }

    const result = await response.json();
    
    return result;
}


export const login = async (email: string, password: string) => {

    const response = await apiClient("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {email, password})
        }
    );


    if (!response.ok) {
        // throw new Error(`Response status: ${response.status}`)
        const error = await response.json();
        throw new Error(error.message || "Login failed");
    }

    const result = await response.json();

    localStorage.setItem("token", result.token);

    return result;
}