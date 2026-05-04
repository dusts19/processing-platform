package com.dustin.processingplatformbackend.analytics.service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.analytics.dto.AnalyticsSummaryDto;
import com.dustin.processingplatformbackend.analytics.dto.AnalyticsTimeseriesDto;
import com.dustin.processingplatformbackend.requestlog.repository.RequestLogRepository;

@Service
public class AnalyticsService {

    private RequestLogRepository requestLogRepository;

    public AnalyticsService(RequestLogRepository requestLogRepository){
        this.requestLogRepository = requestLogRepository;
    }
    

    public AnalyticsSummaryDto getSummary(UUID id) {
        
        List<Object[]> results = requestLogRepository.getSummaryRaw(id);
        // System.out.println(Arrays.toString(result));

        if (results.isEmpty()) {
            return new AnalyticsSummaryDto(0, 0.0, 0.0);
        }

        Object[] result = results.get(0);

        Number totalRequestsNum = (Number) result[0];
        Number successCountNum = (Number) result[2];
        
        double avgLatency = result[1] != null 
            ? ((Number) result[1]).doubleValue()
            : 0.0;

        long totalRequests = totalRequestsNum != null
            ? totalRequestsNum.longValue()
            : 0;

        long successCount = successCountNum !=null
            ? successCountNum.longValue()
            : 0;

        double successRate = totalRequests > 0
            ? (double) successCount / totalRequests * 100
            : 0.0;
        
        return new AnalyticsSummaryDto(
            totalRequests,
            successRate,
            avgLatency
        );
    }

    public List<AnalyticsTimeseriesDto> getTimeSeries(UUID id) {
        List<Object[]> results = requestLogRepository.getTimeseriesRaw(id);

        return results.stream().map((Object[] row) -> {
            LocalDate seriesDate = ((java.sql.Date) row[0]).toLocalDate();
            long total = ((Number) row[1]).longValue();
            long success = ((Number) row[2]).longValue();

            double avgLatency = row[3] != null
                ? ((Number) row[3]).doubleValue()
                : 0.0;
            
            return new AnalyticsTimeseriesDto(
                seriesDate,
                total,
                success,
                avgLatency
            );
        }).toList();
    }
}
