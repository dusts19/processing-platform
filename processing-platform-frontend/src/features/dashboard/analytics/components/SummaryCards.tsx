// import { useQuery } from "@tanstack/react-query"
// import { getAnalyticsSummary } from "../api/analyticsApi"
import { useAnalyticsSummary } from "../hooks/useAnalyticsSummary"
import { Card } from "../../../../components/ui/Card";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import { ErrorMessage } from "../../../../components/shared/ErrorMessage";
import { getErrorMessage } from "../../../../components/shared/apiError";

export const SummaryCards = () => {
    // const {
    //     data: summary = {
    //         totalRequests: 0,
    //         successRate: 0,
    //         avgLatencyMs: 0,
    //     },
    //     isLoading,
    //     error,
    // } = useAnalyticsSummary();
    const {
        data,
        isLoading,
        error,
    } = useAnalyticsSummary();

    if (isLoading){
        return (
            <Card title="summary">
                <div className="p-6 flex justify-center">
                    <LoadingSpinner />
                </div>
            </Card>
        )
    }
    if (error instanceof Error) {
        return (
            <Card title="summary">
                <div className="p-6 flex justify-center">
                    <ErrorMessage message={getErrorMessage(error)}/>
                </div>
            </Card>
        )
    }
                        

    const summary = data!;

    return (
        <Card title="Summary">
                    
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <p>Total Requests:</p>
                    <p>{summary.totalRequests}</p>
                </div>
                <div>
                    <p>Success Rate:</p>
                    <p>{summary.successRate} %</p>
                </div>
                <div>
                    <p>Avg Latency:</p>
                    <p>{summary.avgLatencyMs.toFixed(2)} ms</p>
                </div>
            </div>

        </Card>
    )
}