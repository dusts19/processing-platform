package com.dustin.processingplatformbackend.analytics.dto;

import java.time.LocalDate;

public record AnalyticsTimeseriesDto(
    LocalDate seriesDate,
    long requestCount,
    long successCount,
    double avgLatency
) {

}
