import { useState } from "react";
import { register } from "../api/authApi";
import { Navigate } from "react-router-dom";


const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");
    
    if (token) {
        return <Navigate to="/dashboard" replace />
    }


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try{
            await register(email, password);
            setEmail("")
            setPassword("")
        } catch (err: unknown){
            if (err instanceof Error){
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                    required
                />
                <input 
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                
                {error && <p style={{ color: "red" }}>{error}</p>}

            </form>
        </div>
    )
}

export default RegisterPage;