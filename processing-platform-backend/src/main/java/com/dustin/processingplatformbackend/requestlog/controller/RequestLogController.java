package com.dustin.processingplatformbackend.requestlog.controller;

import com.dustin.processingplatformbackend.requestlog.dto.RequestLogResponse;
import com.dustin.processingplatformbackend.requestlog.model.RequestStatus;
import com.dustin.processingplatformbackend.requestlog.service.RequestLogService;
import com.dustin.processingplatformbackend.security.model.AuthPrincipal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public ResponseEntity<Page<RequestLogResponse>> getRequestLogs(
        @AuthenticationPrincipal AuthPrincipal principal,
        @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
        @RequestParam(required = false) RequestStatus status
    ) {
        Page<RequestLogResponse> requestLogResponse = 
            requestLogService.getRequestLogs(
                principal.userId(),
                pageable,
                status
            );
        return ResponseEntity.ok(requestLogResponse);
    }
    

}
