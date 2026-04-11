package com.dustin.processingplatformbackend.apikey.service;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.apikey.dto.ApiKeyResponse;
import com.dustin.processingplatformbackend.apikey.model.ApiKey;
import com.dustin.processingplatformbackend.apikey.repository.ApiKeyRepository;
import com.dustin.processingplatformbackend.apikey.util.ApiKeyGenerator;
import com.dustin.processingplatformbackend.apikey.util.GeneratedApiKey;
import com.dustin.processingplatformbackend.request.repository.RequestLogRepository;

@Service
public class ApiKeyService {

    private final ApiKeyRepository apiKeyRepository;
    private final RequestLogRepository requestLogRepository;
    private final PasswordEncoder passwordEncoder;

    public ApiKeyService(ApiKeyRepository apiKeyRepository, RequestLogRepository requestLogRepository, PasswordEncoder passwordEncoder) {
        this.apiKeyRepository = apiKeyRepository;
        this.requestLogRepository = requestLogRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ApiKeyResponse createApiKey(UUID userId) {

        GeneratedApiKey apikeyString = ApiKeyGenerator.generate();

        String prefix = apikeyString.prefix();
        String hash = passwordEncoder.encode(apikeyString.fullKey());

        ApiKey apiKey = new ApiKey();
        
        apiKey.setUserId(userId);
        apiKey.setPrefix(prefix);
        apiKey.setKeyHash(hash);


        ApiKey saved = apiKeyRepository.save(apiKey);

        return new ApiKeyResponse(
            saved.getId(),
            apikeyString.fullKey(),
            saved.getCreatedAt()
        );
    }
}
