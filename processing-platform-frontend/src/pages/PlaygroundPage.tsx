import { useState } from "react";
import { processInput } from "../api/playgroundApi";
import type { ProcessResponse } from "../types/processResponse";


const PlaygroundPage = () => {
    const [input, setInput] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [response, setResponse] = useState<ProcessResponse | null>(null);

    
    const handleSubmit = async (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: create api/playgroundAPI.tsx with processInput()
        const result: ProcessResponse = await processInput(input, apiKey);
        setResponse(result);
        // setResponse(`You entered: ${input}`)

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
                    />

                    <input 
                        name="api-key"
                        type="text"
                        value={apiKey}
                        placeholder="API key..."
                        onChange={(e) => setApiKey(e.target.value)}

                    />
                    <button type="submit">Submit</button>
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
        </div>
    );
}

export default PlaygroundPage;