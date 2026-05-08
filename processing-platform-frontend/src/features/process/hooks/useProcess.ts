import { useMutation } from "@tanstack/react-query";
import { processInput } from "../api/processApi";
import type { ProcessResponse } from "../types/processResponse";

type UseProcessOptions = {
    onSuccess?: (data: ProcessResponse) => void;
}

export const useProcess = (
    options?: UseProcessOptions
) => {
    return useMutation({
        mutationFn: ({input, apiKey} : {input: string, apiKey: string}) => 
            processInput(input, apiKey),
        onSuccess: (data) => {
            options?.onSuccess?.(data);
        },
    });
}