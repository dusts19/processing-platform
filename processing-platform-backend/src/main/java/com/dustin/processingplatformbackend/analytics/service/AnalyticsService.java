package com.dustin.processingplatformbackend.analytics.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.analytics.dto.AnalyticsSummaryDto;
import com.dustin.processingplatformbackend.requestlog.repository.RequestLogRepository;

@Service
public class AnalyticsService {

    private RequestLogRepository requestLogRepository;

    public AnalyticsService(RequestLogRepository requestLogRepository){
        this.requestLogRepository = requestLogRepository;
    }
    

    public AnalyticsSummaryDto getSummary(UUID id) {
        
        Object[] result = requestLogRepository.getSummaryRaw(id);

        long totalRequests = (Long) result[0];
        double avgLatency = result[1] != null ? (Double) result[1] : 0.0;
        long successCount = (Long) result[2];

        double successRate = totalRequests > 0
            ? (double) successCount / totalRequests
            : 0.0;
        
        return new AnalyticsSummaryDto(
            totalRequests,
            successRate,
            avgLatency
        );
    }
}
