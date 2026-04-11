package com.dustin.processingplatformbackend.request.service;

import java.util.UUID;

import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.request.model.RequestLog;
import com.dustin.processingplatformbackend.request.model.RequestStatus;
import com.dustin.processingplatformbackend.request.repository.RequestLogRepository;

@Service
public class RequestLogService {
    
    private final RequestLogRepository requestLogRepository;

    public RequestLogService(RequestLogRepository requestLogRepository) {
        this.requestLogRepository = requestLogRepository;
    }
    

    public void log(UUID userId, UUID apiKeyId, HttpMethod httpMethod, String endpoint, Integer statusCode, RequestStatus status, Long latencyMs) {
        
        RequestLog requestLog = new RequestLog();
        requestLog.setUserId(userId);
        requestLog.setApiKeyId(apiKeyId);
        requestLog.setHttpMethod(httpMethod);
        requestLog.setEndpoint(endpoint);
        requestLog.setStatusCode(statusCode);
        requestLog.setStatus(status);
        requestLog.setLatencyMs(latencyMs);
        
        requestLogRepository.save(requestLog);

    }
}
