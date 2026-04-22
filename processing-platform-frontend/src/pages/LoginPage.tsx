import { useState } from "react";


const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setEmail("");
        setPassword("");
    }

    return(
        <div>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    name="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input 
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>

            </form>
        </div>
    )

}

export default AuthPage;