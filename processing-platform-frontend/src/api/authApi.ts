
const BASE_URL = import.meta.env.VITE_API_BASE_URL;




export const register = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/register`,
        {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }
    );
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed")
    }

    const result = await response.json();
    
    return result;
}








export const login = async (email: string, password: string) => {
    // const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(
        `${BASE_URL}/auth/login`,
        {
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