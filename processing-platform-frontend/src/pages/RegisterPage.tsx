import { useState } from "react";
import { register } from "../api/authApi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";


const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
            navigate("/login")
        } catch (err){
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="min-h-dvh flex items-center justify-center bg-gray-50">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
                >
                <h1 className="text-xl font-semibold text-center">Register</h1>
                <input 
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                    required
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input 
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    required 
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
                <p className="text-sm text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
                
                <ErrorMessage message={error} />
            </form>
        </div>
    )
}

export default RegisterPage;