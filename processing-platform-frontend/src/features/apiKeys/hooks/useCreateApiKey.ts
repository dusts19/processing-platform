import { useMutation } from "@tanstack/react-query";
import { createApiKey } from "../api/apiKeyApi";
import { queryClient } from "../../../lib/queryClient";

export const useCreateApiKey = (
    options?: { onSuccess?: (key: string) => void }
) => {
    return useMutation({
        mutationFn: createApiKey,
        onSuccess: (newApiKey) => {
            queryClient.invalidateQueries({ queryKey: ['apiKeys']});
            options?.onSuccess?.(newApiKey.key);
        },
    })
}