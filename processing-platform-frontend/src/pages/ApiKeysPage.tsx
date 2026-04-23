import { useEffect, useState } from "react";
import type { ApiKey } from "../types/apiKey";
import { createApiKey, deleteApiKey, getApiKeys } from "../api/apiKeyApi";

// create ApiKey management UI
const ApiKeysPage = () => {
    // const token = localStorage.getItem("token");
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

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
        try {
            const newApiKey = await createApiKey();
            setApiKeys((prev) => [...prev, newApiKey]);
        } catch (err) {
            console.error(err);
        }
    }    

    const handleDelete = async (id:string) => {
        try {
            await deleteApiKey(id);
            setApiKeys(prev => prev.filter(item => item.id != id))
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <button onClick={handleCreate}>Create Api Key</button>

            {apiKeys && 
                <ul>{apiKeys.map(apiKey => (
                    <li key={apiKey.id}>
                        <div>{apiKey.key}</div>
                        <button onClick={() => handleDelete(apiKey.id)}>Delete</button></li>
                ))}
                </ul>
            }

        </div>
    )
}

export default ApiKeysPage;