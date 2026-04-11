package com.dustin.processingplatformbackend.apikey.controller;

import com.dustin.processingplatformbackend.request.repository.RequestLogRepository;
import com.dustin.processingplatformbackend.user.model.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dustin.processingplatformbackend.apikey.dto.ApiKeyResponse;
import com.dustin.processingplatformbackend.apikey.service.ApiKeyService;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/api-keys")
public class ApiKeyController {
    
    private final ApiKeyService apiKeyService;

    ApiKeyController(ApiKeyService apiKeyService) {
        this.apiKeyService = apiKeyService;
    }

    @PostMapping
    public ApiKeyResponse createApiKey(@AuthenticationPrincipal User user) {
        
        return apiKeyService.createApiKey(user.getId());

    }

    @GetMapping
    public String getApiKeys(@RequestParam String param) {
        
        return new String();
    }
    
    

}
