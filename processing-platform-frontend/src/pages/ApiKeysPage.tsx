import { useEffect, useState } from "react";
import type { ApiKeyResponse } from "../types/apiKeyResponse";
import { createApiKey, deleteApiKey, getApiKeys } from "../api/apiKeyApi";
import { getErrorMessage } from "../components/shared/apiError";
import { ErrorMessage } from "../components/shared/ErrorMessage";

// create ApiKey management UI
const ApiKeysPage = () => {
    // const token = localStorage.getItem("token");
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
            alert(newApiKey.key);
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
        <div>
            <button onClick={handleCreate} disabled={loading}>
                {loading ? "Creating..." : "Create Api Key"}
            </button>

            <ErrorMessage message={error} />

            {apiKeys.length > 0 && (
                <ul>{apiKeys.map(apiKey => (
                    <li key={apiKey.id}>
                        <div>{apiKey.key}</div>
                        <button onClick={() => handleDelete(apiKey.id)}>Delete</button></li>
                ))}
                </ul>
            )}

        </div>
    )
}

export default ApiKeysPage;