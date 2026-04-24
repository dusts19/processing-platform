import { useState } from "react";


const PlaygroundPage = () => {
    const [input, setInput] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [response, setResponse] = useState("");

    
    const handleSubmit = async (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: create api/playgroundAPI.tsx with processInput()
        const res = await processInput(input, apiKey);
        setResponse(res);
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
                {response && <p>{response}</p>}
            </div>
        </div>
    );
}

export default PlaygroundPage;