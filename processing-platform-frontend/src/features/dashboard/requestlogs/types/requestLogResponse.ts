export type RequestLogResponse = {
    id: string;
    httpMethod: string;
    endpoint: string;
    statusCode: number;
    status: string;
    latencyMs: number;
    createdAt?: string;
}