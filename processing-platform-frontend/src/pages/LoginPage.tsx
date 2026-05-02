import { useState } from "react";
import { login } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";
import { useMutation } from "@tanstack/react-query";


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const mutation = useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => 
            login(email, password),
        onSuccess: (data) => {
            setEmail("");
            setPassword("");
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        }
    })


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutation.mutate({ email, password });

        // setLoading(true);
        // setError("");

        // try {
        //     await login(email, password);
        //     setEmail("");
        //     setPassword("");
        //     navigate("/dashboard");
        // } catch(err) {
        //     setError(getErrorMessage(err));

        // } finally {
        //     setLoading(false);
        // }
    }

    return(
        <div className="min-h-dvh flex items-center justify-center bg-gray-50">

            <form 
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
            >
                <h1 className="text-xl font-semibold text-center">Login</h1>
                
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
                    name="password"
                    type="password"
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
                    {mutation.isPending ? "Logging in..." : "Login"}
                </button>
                <p className="text-sm text-center">
                    Don't have an account yet? <Link to="/register" className="text-blue-500">Register</Link>
                </p>

                <ErrorMessage message={ getErrorMessage(mutation.error) } />
            </form>
        </div>
    )

}

export default LoginPage;