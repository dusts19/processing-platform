import { useState } from "react";
import { processInput } from "../api/playgroundApi";
import type { ProcessResponse } from "../types/processResponse";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { Card } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";


const PlaygroundPage = () => {
    const [input, setInput] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [response, setResponse] = useState<ProcessResponse | null>(null);

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

    }
    return(
        <div className="space-y-6">
            <h1 className="text-2xl p-2 mb-3 font-semibold">API Playground</h1>
            <Card title="Test API">
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <Input 
                        id="text"
                        type="text"
                        value={input}
                        placeholder="Enter text..."
                        label="Input"
                        onChange={(e) => setInput(e.target.value)}
                        disabled={mutation.isPending}
                        />
                    <Input 
                        id="api-key"
                        type="text"
                        value={apiKey}
                        placeholder="API key..."
                        label="Api key"
                        onChange={(e) => setApiKey(e.target.value)}
                        disabled={mutation.isPending}                    
                    />
                    <Button
                        type="submit" 
                        isLoading={mutation.isPending}
                    >
                        Submit
                    </Button>
                </form>
                <ErrorMessage message={getErrorMessage(mutation.error)} />
            </Card>
            
            {response && (
                <Card title="Response">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <strong>Length:</strong>{response.length}
                        </div>
                        <div>
                            <strong>Word Count:</strong>{response.wordCount}
                        </div>
                        <div className="col-span-2 break-all">
                            <strong>Uppercase:</strong>{response.uppercase}
                        </div>
                        <div>
                            <strong>Latency:</strong>{response.processingTimeMs} ms
                        </div>
                    </div>
                </Card>
            )}
            
            
        </div>
    );
}

export default PlaygroundPage;