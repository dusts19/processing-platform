package com.dustin.processingplatformbackend.process.service;

import java.util.UUID;

import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.process.dto.ProcessRequest;
import com.dustin.processingplatformbackend.process.dto.ProcessResponse;
import com.dustin.processingplatformbackend.request.model.RequestStatus;
import com.dustin.processingplatformbackend.request.service.RequestLogService;

@Service
public class ProcessService {

    private final RequestLogService requestLogService;

    public ProcessService(RequestLogService requestLogService) {
        this.requestLogService = requestLogService;
    }
    
    public ProcessResponse process(
        ProcessRequest processRequest,
        UUID userId,
        UUID apiKeyId,
        HttpMethod httpMethod,
        String endpoint
    ) {
        long startTime = System.currentTimeMillis();

        String input = processRequest.input();
        int length = input.length();

        int wordCount = input.trim().isEmpty()
            ? 0
            : input.split("\\s+").length;

        String uppercase = input.toUpperCase();

        long processingTimeMs = System.currentTimeMillis() - startTime;

        Integer statusCode = 200;
        RequestStatus status = RequestStatus.SUCCESS;

        ProcessResponse response = new ProcessResponse(
            length, 
            wordCount, 
            uppercase, 
            processingTimeMs
        );

        requestLogService.log(userId, apiKeyId, httpMethod, endpoint, statusCode, status, processingTimeMs);

        return response;
    }
}
