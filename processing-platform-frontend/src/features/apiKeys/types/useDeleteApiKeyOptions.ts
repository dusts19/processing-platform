export type useDeleteApiKeyOptions = {
    onMutate?: (id: string) => void;
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
    onSettled?: () => void;
}