// import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
// import { createApiKey } from "../api/apiKeyApi";
// import { queryClient } from "../../../lib/queryClient";
import { Card } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
// import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { ErrorMessage } from "../../../components/shared/ErrorMessage";
import { getErrorMessage } from "../../../components/shared/apiError";
import { useCreateApiKey } from "../hooks/useCreateApiKey"
// import type { ApiKeyResponse } from "../types/apiKeyResponse";

const CreateApiKeyCard = () => {
    const [newKey, setNewKey] = useState<string | null>(null);
    

    const createMutation = useCreateApiKey({
        onSuccess: (key: string) => {
            setNewKey(key)
        }
    });


    if (createMutation.isError) {
        return (
            <div className="p-6 flex justify-center">
                <ErrorMessage message={getErrorMessage(createMutation.error)} />
            </div>
        )
    }
    

    return (
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
    )
}

export default CreateApiKeyCard;