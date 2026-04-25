import { useEffect, useState } from "react";
import type { ApiKeyResponse } from "../types/apiKeyResponse";
import { createApiKey, deleteApiKey, getApiKeys } from "../api/apiKeyApi";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";

const ApiKeysPage = () => {

    const [newKey, setNewKey] = useState<string | null>(null);
    const [apiKeys, setApiKeys] = useState<ApiKeyResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchKeys = async () => {
            try{
                const data = await getApiKeys();
                setApiKeys(data);
            } catch(err) {
                setError(getErrorMessage(err));
            }
        }
        fetchKeys();
    },[])

    const handleCreate = async () => {
        setLoading(true);
        setError("");
        try {
            const newApiKey = await createApiKey();
            setNewKey(newApiKey.key);
            // alert(newApiKey.key);
            setApiKeys((prev) => [...prev, newApiKey]);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }    

    const handleDelete = async (id:string) => {
        setError("");

        try {
            await deleteApiKey(id);
            setApiKeys(prev => prev.filter(item => item.id !== id))
        } catch (err) {
            setError(getErrorMessage(err));
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">API Keys</h1>
            <button 
                onClick={handleCreate}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"

            >
                {loading ? "Creating..." : "Create Api Key"}
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

            <ErrorMessage message={error} />

            {apiKeys.length > 0 && (
                <div className="bg-white rounded-lg shadow max-w-xl">
                    <ul>
                        {apiKeys.map(apiKey => (
                            <li 
                                key={apiKey.id}
                                className="flex items-center justify-between p-4 border-t first:border-t-0"
                            >
                                <code className="text-sm break-all">{apiKey.key}</code>
                                <button 
                                    onClick={() => handleDelete(apiKey.id)}
                                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
}

export default ApiKeysPage;