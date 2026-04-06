package com.dustin.processingplatformbackend.process.service;

import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.process.dto.ProcessRequest;
import com.dustin.processingplatformbackend.process.dto.ProcessResponse;
import com.dustin.processingplatformbackend.request.model.RequestLog;
import com.dustin.processingplatformbackend.request.repository.RequestLogRepository;

@Service
public class ProcessService {

    private final RequestLogRepository requestLogRepository;

    public ProcessService(RequestLogRepository requestLogRepository) {
        this.requestLogRepository = requestLogRepository;
    }
    
    public ProcessResponse process(ProcessRequest processRequest) {
        long startTime = System.currentTimeMillis();

        String input = processRequest.input();
        int length = input.length();
        int wordCount = input.split("\\s+").length;
        String uppercase = input.toUpperCase();

        long endTime = System.currentTimeMillis();

        long processingTimeMs = startTime - endTime;

        // RequestLog requestlog = new RequestLog(
            
        // );

        // requestLogRepository.save(requestLog);


        return new ProcessResponse(length, wordCount, uppercase, processingTimeMs);
    }
}
