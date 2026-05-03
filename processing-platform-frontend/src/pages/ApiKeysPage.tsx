import { useState } from "react";
import type { ApiKeyResponse } from "../types/apiKeyResponse";
import { createApiKey, deleteApiKey, getApiKeys } from "../api/apiKeyApi";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/shared/LoadingSpinner";

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

    if (isLoading) {
        return (
            <div className="p-6 flex justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    const errorMessage = 
        getErrorMessage(queryError) ||
        getErrorMessage(createMutation.error) ||
        getErrorMessage(deleteMutation.error);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">API Keys</h1>

            <ErrorMessage message={errorMessage} />

            <Card title="Create API key">
                <Button 
                    onClick={() => createMutation.mutate()}
                    isLoading={createMutation.isPending}
                >
                    Create Api Key
                </Button>
                {newKey && (
                    <div className="bg-yellow-100 border border-yellow-300 rounded p-4 mt-4 space-y-2">
                        <p className="font-medium">
                            Copy your API key now. You won't see it again.
                        </p>

                        <code className="block bg-white p-2 rounded border text-sm break-all">
                            {newKey}
                        </code>

                        <div className="flex gap-2">
                            <Button 
                                size="sm"
                                onClick={() => navigator.clipboard.writeText(newKey)}
                            >
                                Copy
                            </Button>

                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => setNewKey(null)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            <Card title="Your API Keys">
                {apiKeys.length === 0 ? (
                    <p className="p-4 text-gray-500">No API keys yet</p>
                ) : (
                    <ul>
                        {apiKeys.map(apiKey => (
                            <li 
                                key={apiKey.id}
                                className="flex items-center justify-between p-4 border-t first:border-t-0"
                            >
                                <code className="text-sm break-all">{apiKey.key}</code>
                                <Button
                                    size="sm"
                                    variant="danger" 
                                    onClick={() => deleteMutation.mutate(apiKey.id)}
                                    isLoading={deleteMutation.isPending} //delete later, change to tracking which id to delete
                                >
                                    Delete
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    )
}

export default ApiKeysPage;