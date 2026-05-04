package com.dustin.processingplatformbackend.analytics.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dustin.processingplatformbackend.analytics.dto.AnalyticsSummaryDto;
import com.dustin.processingplatformbackend.analytics.dto.AnalyticsTimeseriesDto;
import com.dustin.processingplatformbackend.analytics.service.AnalyticsService;
import com.dustin.processingplatformbackend.security.model.AuthPrincipal;


@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }
    
    @GetMapping("/summary")
    public ResponseEntity<AnalyticsSummaryDto> getSummary(@AuthenticationPrincipal AuthPrincipal principal) {
        AnalyticsSummaryDto analyticsSummaryDto = analyticsService.getSummary(principal.userId());
        return ResponseEntity.ok(analyticsSummaryDto);
    }

    @GetMapping("/timeseries")
    public ResponseEntity<List<AnalyticsTimeseriesDto>> getTimeseries(@AuthenticationPrincipal AuthPrincipal principal) {
        List<AnalyticsTimeseriesDto> analyticsTimeseriesDtoList = analyticsService.getTimeSeries(principal.userId());
        return ResponseEntity.ok(analyticsTimeseriesDtoList);
    }
    
}
