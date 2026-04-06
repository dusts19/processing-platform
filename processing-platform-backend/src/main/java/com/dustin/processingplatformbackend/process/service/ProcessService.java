package com.dustin.processingplatformbackend.process.service;

import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.process.dto.ProcessRequest;
import com.dustin.processingplatformbackend.process.dto.ProcessResponse;

@Service
public class ProcessService {
    
    public ProcessResponse process(ProcessRequest processRequest) {
        long startTime = System.currentTimeMillis();

        String input = processRequest.input();
        int length = input.length();
        int wordCount = input.split("\\s+").length;
        String uppercase = input.toUpperCase();

        long endTime = System.currentTimeMillis();

        long processingTimeMs = startTime - endTime;

        return new ProcessResponse(length, wordCount, uppercase, processingTimeMs);
    }
}
