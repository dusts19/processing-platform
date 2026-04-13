package com.dustin.processingplatformbackend.apikey.controller;

import com.dustin.processingplatformbackend.security.AuthPrincipal;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dustin.processingplatformbackend.apikey.dto.ApiKeyResponse;
import com.dustin.processingplatformbackend.apikey.service.ApiKeyService;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/api-keys")
public class ApiKeyController {
    
    private final ApiKeyService apiKeyService;

    public ApiKeyController(ApiKeyService apiKeyService) {
        this.apiKeyService = apiKeyService;
    }

    @PostMapping
    public ApiKeyResponse createApiKey(@AuthenticationPrincipal AuthPrincipal principal) {
        
        return apiKeyService.createApiKey(principal.userId());

    }

    @GetMapping
    public List<ApiKeyResponse> getApiKeys(@AuthenticationPrincipal AuthPrincipal principal) {
        
        return apiKeyService.getApiKeys(principal.userId());
    }
    
    

}
