package com.dustin.processingplatformbackend.apikey.controller;

import com.dustin.processingplatformbackend.security.AuthPrincipal;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dustin.processingplatformbackend.apikey.dto.ApiKeyResponse;
import com.dustin.processingplatformbackend.apikey.service.ApiKeyService;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



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
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApiKey(@AuthenticationPrincipal AuthPrincipal principal, @PathVariable UUID id) {
        apiKeyService.deleteApiKey(principal.userId(), id);
        
        return ResponseEntity.noContent().build();
    }

}
