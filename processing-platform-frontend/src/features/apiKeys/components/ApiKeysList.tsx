import { useState } from "react";
import { getErrorMessage } from "../../../components/shared/apiError";
import { ErrorMessage } from "../../../components/shared/ErrorMessage";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import Button from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { useDeleteApiKey } from "../hooks/useDeleteApiKey";
import { useGetApiKeys } from "../hooks/useGetApiKeys";
import type { ApiKeyResponse } from "../types/apiKeyResponse";

export const ApiKeysList = () => {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const {
        data: apiKeys = [],
        isLoading,
        isError,
        error,
    } = useGetApiKeys();
    
    const deleteMutation = useDeleteApiKey({
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onError: (err) => {
            console.error(err);
        }
    });
    
    if (isLoading) {
        return(
            <Card className="flex p-6 justify-center">
                <LoadingSpinner />
            </Card>
        )
    }

    if (isError) {
        return(
            <Card className="flex p-6 justify-center">
                <ErrorMessage message={getErrorMessage(error)} />
            </Card>
        )
    }

    return (
        <Card title="Your API Keys">
            {apiKeys.length === 0 ? (
                <p className="p-4 text-gray-500">No API keys yet</p>
            ) : (
                <ul>
                    {apiKeys.map((apiKey: ApiKeyResponse) => (
                        <li 
                            key={apiKey.id}
                            className="flex items-center justify-between p-4 border-t first:border-t-0"
                        >
                            <code className="text-sm break-all">{apiKey.key}</code>
                            <Button
                                size="sm"
                                variant="danger" 
                                onClick={() => deleteMutation.mutate(apiKey.id)}
                                isLoading={deletingId === apiKey.id}
                            >
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    )
}