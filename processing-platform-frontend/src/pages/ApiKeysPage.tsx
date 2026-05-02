import { useState } from "react";
import type { ApiKeyResponse } from "../types/apiKeyResponse";
import { createApiKey, deleteApiKey, getApiKeys } from "../api/apiKeyApi";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const ApiKeysPage = () =>{
    const queryClient = useQueryClient();
    const [newKey, setNewKey] = useState<string | null>(null);


    const {
        data: apiKeys = [],
        isLoading,
        error: queryError,
    } = useQuery<ApiKeyResponse[]>({
        queryKey: ['apiKeys'],
        queryFn: getApiKeys,
    })



    const createMutation = useMutation({
        mutationFn: createApiKey,
        onSuccess: (newApiKey) => {
            setNewKey(newApiKey.key);

            queryClient.invalidateQueries({ queryKey: ['apiKeys']});
        },
    })

 
    
    const deleteMutation = useMutation({
        mutationFn: deleteApiKey,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
        },
    })


    const errorMessage = 
        (queryError && getErrorMessage(queryError)) ||
        (createMutation.error && getErrorMessage(createMutation.error)) ||
        (deleteMutation.error && getErrorMessage(deleteMutation.error)) ||
        "";

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">API Keys</h1>
            <button 
                onClick={() => createMutation.mutate()}
                disabled={createMutation.isPending}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"

            >
                {createMutation.isPending ? "Creating..." : "Create Api Key"}
            </button>
            {newKey && (
                <div className="bg-yellow-100 border border-yellow-300 rounded p-4 max-w-xl space-y-2">
                    <p className="font-medium">
                        Copy your API key now. You won't see it again.
                    </p>
                    <code className="block bg-white p-2 rounded border text-sm break-all">
                        {newKey}
                    </code>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => navigator.clipboard.writeText(newKey)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Copy
                        </button>
                        <button
                            onClick={() => setNewKey(null)} 
                            className="px-3 py-1 border rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <ErrorMessage message={errorMessage} />

            
            <div className="bg-white rounded-lg shadow max-w-xl">
                {isLoading ? (
                    <p className="p-4">Loading...</p>
                ) : apiKeys.length === 0 ? (
                    <p className="p-4 text-gray-500">No API keys yet</p>
                ) : (
                    <ul>
                        {apiKeys.map(apiKey => (
                            <li 
                                key={apiKey.id}
                                className="flex items-center justify-between p-4 border-t first:border-t-0"
                            >
                                <code className="text-sm break-all">{apiKey.key}</code>
                                <button 
                                    onClick={() => deleteMutation.mutate(apiKey.id)}
                                    disabled={deleteMutation.isPending}
                                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    )
}

export default ApiKeysPage;