import type { RequestStatus } from "./requestStatus";

export type RequestLogResponse = {
    id: string;
    httpMethod: string;
    endpoint: string;
    statusCode: number;
    status: RequestStatus;
    latencyMs: number;
    createdAt?: string;
}