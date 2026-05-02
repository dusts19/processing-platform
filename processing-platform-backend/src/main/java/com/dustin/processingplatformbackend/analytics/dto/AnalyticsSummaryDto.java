package com.dustin.processingplatformbackend.analytics.dto;

public record AnalyticsSummaryDto(
    long totalRequests,
    double successRate,
    double avgLatencyMs
) {
    
}
