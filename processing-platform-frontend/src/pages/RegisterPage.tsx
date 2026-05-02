import { useState } from "react";
import { register } from "../api/authApi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";
import { useMutation } from "@tanstack/react-query";


const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    
    const mutation = useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => 
            register(email, password),
        onSuccess: () => {
            setEmail("")
            setPassword("")
            navigate("/login")
        },
    })

    if (token) {
        return <Navigate to="/dashboard" replace />
    }


    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutation.mutate({ email, password });

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
                    disabled={mutation.isPending}
                    required
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input 
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    disabled={mutation.isPending}
                    required 
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600 disabled:opacity-50"
                >
                    {mutation.isPending ? "Registering..." : "Register"}
                </button>
                <p className="text-sm text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
                
                <ErrorMessage message={getErrorMessage(mutation.error)} />
            </form>
        </div>
    )
}

export default RegisterPage;