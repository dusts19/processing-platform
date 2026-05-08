import { useState } from "react";
// import { processInput } from "../features/process/api/processApi";
// import type { ProcessResponse } from "../features/process/types/processResponse";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";
// import { useMutation } from "@tanstack/react-query";
import { Card } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useProcess } from "../features/process/hooks/useProcess";
import { ProcessResultCard } from "../features/process/components/ProcessResultCard";


const PlaygroundPage = () => {
    const [input, setInput] = useState("");
    const [apiKey, setApiKey] = useState("");
    
    const mutation = useProcess({
        onSuccess: () => {
            setInput("");
            setApiKey("");
        }
    });
    const processResult = mutation.data;
    
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
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
                        disabled={!input.trim() || !apiKey.trim()}
                    >
                        Submit
                    </Button>
                </form>
                {mutation.isError && (
                    <ErrorMessage message={getErrorMessage(mutation.error)} />
                )}
            </Card>

            {mutation.isPending && (
                <Card title="Response">
                    <p className="text-gray-500 p-4">Processing...</p>
                </Card>
            )}
            
            {processResult && (
                <ProcessResultCard result={processResult}/>
                // <Card title="Response">
                //     <div className="grid grid-cols-2 gap-4 text-sm">
                //         <div>
                //             <strong>Length:{" "}</strong>{processResult.length}
                //         </div>
                //         <div>
                //             <strong>Word Count:{" "}</strong>{processResult.wordCount}
                //         </div>
                //         <div className="col-span-2 break-all">
                //             <strong>Uppercase:{" "}</strong>{processResult.uppercase}
                //         </div>
                //         <div>
                //             <strong>Latency:{" "}</strong>{processResult.processingTimeMs.toFixed(2) ?? "0.0"} ms
                //         </div>
                //     </div>
                // </Card>
            )}
            
            
        </div>
    );
}

export default PlaygroundPage;