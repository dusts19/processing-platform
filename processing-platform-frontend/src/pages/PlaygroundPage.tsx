import { useState } from "react";
import { processInput } from "../api/playgroundApi";
import type { ProcessResponse } from "../types/processResponse";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";
import { useMutation } from "@tanstack/react-query";


const PlaygroundPage = () => {
    const [input, setInput] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [response, setResponse] = useState<ProcessResponse | null>(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");

    const mutation = useMutation({
        mutationFn: ({input, apiKey} : {input: string, apiKey: string}) => 
            processInput(input, apiKey),
        onSuccess: (data) => {
            setResponse(data);
            setInput("");
        },
    });
    
    const handleSubmit = async (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({ input, apiKey });
        // setLoading(true);
        // setError("");

        // try {
        //     const result = await processInput(input, apiKey);
        //     setResponse(result);
        //     setInput("");
        // } catch(err) {
        //     setError(getErrorMessage(err));
        // } finally {
        //     setLoading(false);
        // }

    }
    return(
        <div className="space-y-6">
            <h1 className="text-2xl p-2 mb-3 font-semibold">API Playground</h1>
            <div className="bg-white rounded-lg shadow p-6 max-w-xl">
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <input 
                        type="text"
                        value={input}
                        placeholder="Enter text..."
                        onChange={(e) => setInput(e.target.value)}
                        disabled={mutation.isPending}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input 
                        type="text"
                        value={apiKey}
                        placeholder="API key..."
                        onChange={(e) => setApiKey(e.target.value)}
                        disabled={mutation.isPending}
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button 
                        type="submit" 
                        disabled={mutation.isPending}
                        className="border rounded p-2 bg-blue-500 text-white focus:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >{mutation.isPending ? "Processing...": "Submit"}</button>
                </form>
            </div>
            <ErrorMessage message={getErrorMessage(mutation.error) || ""} />
            <div>
                {response && <div className="grid grid-cols-2 gap-4 bg-white rounded-lg shadow p-6 max-w-xl space-y-2">
                    <div><strong>Length:       </strong>{response.length}</div>
                    <div><strong>Word Count:   </strong>{response.wordCount}</div>
                    <div className="break-all"><strong>Uppercase:    </strong>{response.uppercase}</div>
                    <div><strong>Latency (ms): </strong>{response.processingTimeMs}</div>
                </div>}
            </div>
        </div>
    );
}

export default PlaygroundPage;