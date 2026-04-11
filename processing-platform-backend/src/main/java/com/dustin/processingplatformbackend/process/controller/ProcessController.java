package com.dustin.processingplatformbackend.process.controller;

import java.util.UUID;

import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dustin.processingplatformbackend.process.dto.ProcessRequest;
import com.dustin.processingplatformbackend.process.dto.ProcessResponse;
import com.dustin.processingplatformbackend.process.service.ProcessService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/process")
public class ProcessController {

    private final ProcessService processService;

    public ProcessController(ProcessService processService) {
        this.processService = processService;
    }
    
    @PostMapping
    public ProcessResponse processInput(@RequestBody ProcessRequest processRequest, HttpServletRequest request) {

        UUID userId = (UUID) request.getAttribute("userId");
        UUID apiKeyId = (UUID) request.getAttribute("apiKeyId");
        HttpMethod httpMethod = HttpMethod.valueOf(request.getMethod());
        String endpoint = request.getRequestURI();

        return processService.process(processRequest, userId, apiKeyId, httpMethod, endpoint);

    }
}
