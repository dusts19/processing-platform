import { useMutation } from "@tanstack/react-query"
import { deleteApiKey } from "../api/apiKeyApi"
import { queryClient } from "../../../lib/queryClient"
import type { useDeleteApiKeyOptions } from "../types/useDeleteApiKeyOptions"

export const useDeleteApiKey = (
    options?: useDeleteApiKeyOptions
) => {
    return useMutation({
        mutationFn: deleteApiKey,
        onMutate: (id) => {
            options?.onMutate?.(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['apiKeys']});
            options?.onSuccess?.();
        },
        onError: (error) => {
            options?.onError?.(error);
        },
        onSettled: () => {
            options?.onSettled?.();
        },
    });
};