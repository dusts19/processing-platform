package com.dustin.processingplatformbackend.request.controller;

import com.dustin.processingplatformbackend.request.service.RequestLogService;
import com.dustin.processingplatformbackend.security.AuthPrincipal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dustin.processingplatformbackend.request.dto.RequestLogResponse;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/requests")
public class RequestLogController {
  
    private final RequestLogService requestLogService;

    public RequestLogController(RequestLogService requestLogService) {
        this.requestLogService = requestLogService;
    }

    @GetMapping
    public List<RequestLogResponse> getRequestLogs(@AuthenticationPrincipal AuthPrincipal principal) {
        
        return requestLogService.getRequestLogs(principal.userId());
    }
    

}
