package com.dustin.processingplatformbackend.apikey.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dustin.processingplatformbackend.apikey.dto.ApiKeyResponse;
import com.dustin.processingplatformbackend.apikey.service.ApiKeyService;
import com.dustin.processingplatformbackend.security.model.AuthPrincipal;

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
    public ResponseEntity<ApiKeyResponse> createApiKey(@AuthenticationPrincipal AuthPrincipal principal) {
        ApiKeyResponse apiKeyResponse = apiKeyService.createApiKey(principal.userId());
        return ResponseEntity.ok(apiKeyResponse);
    }

    @GetMapping
    public ResponseEntity<List<ApiKeyResponse>> getApiKeys(@AuthenticationPrincipal AuthPrincipal principal) {
        List<ApiKeyResponse> apiKeyResponse = apiKeyService.getApiKeys(principal.userId());
        
        return ResponseEntity.ok(apiKeyResponse);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApiKey(@AuthenticationPrincipal AuthPrincipal principal, @PathVariable UUID id) {
        apiKeyService.deleteApiKey(principal.userId(), id);
        
        return ResponseEntity.noContent().build();
    }

}
