package com.dustin.processingplatformbackend.requestlog.service;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.requestlog.dto.RequestLogResponse;
import com.dustin.processingplatformbackend.requestlog.model.RequestLog;
import com.dustin.processingplatformbackend.requestlog.model.RequestMethod;
import com.dustin.processingplatformbackend.requestlog.model.RequestStatus;
import com.dustin.processingplatformbackend.requestlog.repository.RequestLogRepository;

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
        requestLog.setHttpMethod(RequestMethod.valueOf(httpMethod.name()));
        requestLog.setEndpoint(endpoint);
        requestLog.setStatusCode(statusCode);
        requestLog.setStatus(status);
        requestLog.setLatencyMs(latencyMs);
        
        requestLogRepository.save(requestLog);

    }

    public List<RequestLogResponse> getRequestLogs(UUID userId) {
        
        List<RequestLog> requestLogs = requestLogRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return requestLogs.stream()
            .map(log -> new RequestLogResponse(
                log.getId(),
                log.getHttpMethod().name(),
                log.getEndpoint(),
                log.getStatusCode(),
                log.getStatus(),
                log.getLatencyMs(),
                log.getCreatedAt().toString()
            ))
            .toList();
    }
}
