import { Card } from "../../../components/ui/Card"
import type { ProcessResponse } from "../types/processResponse"

export const ProcessResultCard = ({ result }: { result: ProcessResponse }) => {
    return (
        <Card title="Response">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <strong>Length:{" "}</strong>{result.length}
                </div>
                <div>
                    <strong>Word Count:{" "}</strong>{result.wordCount}
                </div>
                <div className="col-span-2 break-all">
                    <strong>Uppercase:{" "}</strong>{result.uppercase}
                </div>
                <div>
                    <strong>Latency:{" "}</strong>{(result.processingTimeMs ?? 0).toFixed(2)} ms
                </div>
            </div>
        </Card>
    )
}