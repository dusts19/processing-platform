import { useState } from "react";
import { login } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { Card } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";


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
    }

    return(
        <div className="min-h-dvh flex items-center justify-center bg-gray-50">
            <Card 
                title="Login"
                titleAlign="center"
                className="w-full max-w-md"
            >
                <form 
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        disabled={mutation.isPending}
                        required
                    />

                    <Input 
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        disabled={mutation.isPending}
                        required
                    />

                    <ErrorMessage message={ getErrorMessage(mutation.error) } />
                    <Button 
                        type="submit" 
                        isLoading={mutation.isPending}
                        className="w-full"
                    >
                        Login
                    </Button>
                    <p className="text-sm text-center">
                        Don't have an account yet?{" "} 
                        <Link to="/register" className="text-blue-500">
                            Register
                        </Link>
                    </p>

                </form>
            </Card>
        </div>
    )

}

export default LoginPage;