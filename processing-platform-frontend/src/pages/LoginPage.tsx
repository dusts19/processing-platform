import { useState } from "react";
import { login } from "../api/authApi";
import { Navigate, useNavigate } from "react-router-dom";


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    
    if (token) {
        return <Navigate to="/dashboard" replace/>
    }


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await login(email, password);
            setEmail("");
            setPassword("");
            navigate("/dashboard");
        } catch(err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }

        } finally {
            setLoading(false);
        }
    }

    return(
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
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                {error && <p style={{ color: "red"}}>{error}</p>}

            </form>
        </div>
    )

}

export default LoginPage;