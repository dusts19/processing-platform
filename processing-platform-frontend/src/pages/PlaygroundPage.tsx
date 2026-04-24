import { useState } from "react";
import { processInput } from "../api/playgroundApi";
import type { ProcessResponse } from "../types/processResponse";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";


const PlaygroundPage = () => {
    const [input, setInput] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [response, setResponse] = useState<ProcessResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleSubmit = async (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setLoading(true);
        setError("");

        try {
            const result = await processInput(input, apiKey);
            setResponse(result);
            setInput("");
        } catch(err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }

    }
    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        name="process"
                        type="text"
                        value={input}
                        placeholder="Enter text..."
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                    />

                    <input 
                        name="api-key"
                        type="text"
                        value={apiKey}
                        placeholder="API key..."
                        onChange={(e) => setApiKey(e.target.value)}
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>Submit</button>
                </form>
            </div>
            <div>
                {response && <div>
                    <div>Length:     {response.length}</div>
                    <div>Word Count: {response.wordCount}</div>
                    <div>Uppercase: {response.uppercase}</div>
                    <div>Latency (ms): {response.processingTimeMs}</div>
                </div>}
            </div>
            {error && <p style={{ color:"red" }}>{error}</p>}
            <ErrorMessage message={error} />
        </div>
    );
}

export default PlaygroundPage;