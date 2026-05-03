package com.dustin.processingplatformbackend.requestlog.controller;

import com.dustin.processingplatformbackend.requestlog.dto.RequestLogResponse;
import com.dustin.processingplatformbackend.requestlog.service.RequestLogService;
import com.dustin.processingplatformbackend.security.model.AuthPrincipal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<RequestLogResponse>> getRequestLogs(@AuthenticationPrincipal AuthPrincipal principal) {
        List<RequestLogResponse> requestLogResponse = requestLogService.getRequestLogs(principal.userId());
        System.out.println("logs Principal: " + principal);
        return ResponseEntity.ok(requestLogResponse);
    }
    

}
