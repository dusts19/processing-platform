package com.dustin.processingplatformbackend.analytics.dto;

public record AnalyticsSummaryDto(
    long totalRequests,
    double successRatePercentage,
    double avgLatencyMs
) {
    
}
