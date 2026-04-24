import { useState } from "react";
import { login } from "../api/authApi";
import { Navigate, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";


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
        } catch(err) {
            setError(getErrorMessage(err));

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

                <ErrorMessage message={error} />
            </form>
        </div>
    )

}

export default LoginPage;