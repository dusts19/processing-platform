import { useEffect, useState } from "react";
import type { ApiKey } from "../types/apiKey";
import { createApiKey, deleteApiKey, getApiKeys } from "../api/apiKeyApi";

// create ApiKey management UI
const ApiKeysPage = () => {
    // const token = localStorage.getItem("token");
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchKeys = async () => {
            try{
                const data = await getApiKeys();
                setApiKeys(data);
            } catch(err) {
                console.error(err);
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
        } catch {
            setError("Failed to create API key");
        } finally {
            setLoading(false);
        }
    }    

    const handleDelete = async (id:string) => {
        setError("");

        try {
            await deleteApiKey(id);
            setApiKeys(prev => prev.filter(item => item.id !== id))
        } catch {
            setError("Failed to delete API key");
        }
    }

    return (
        <div>
            <button onClick={handleCreate} disabled={loading}>
                {loading ? "Creating..." : "Create Api Key"}
            </button>

            {error && <p style={{ color:"red" }}>{error}</p> }

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