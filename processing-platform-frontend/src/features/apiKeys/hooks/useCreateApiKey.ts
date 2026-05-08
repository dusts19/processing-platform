import { useMutation } from "@tanstack/react-query";
import { createApiKey } from "../api/apiKeyApi";
import { queryClient } from "../../../lib/queryClient";
import type { ApiKeyResponse } from "../types/apiKeyResponse";

export const useCreateApiKey = (
    options?: { onSuccess?: (data: ApiKeyResponse) => void }
) => {
    return useMutation({
        mutationFn: createApiKey,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['apiKeys']});
            options?.onSuccess?.(data);
        },
    })
}