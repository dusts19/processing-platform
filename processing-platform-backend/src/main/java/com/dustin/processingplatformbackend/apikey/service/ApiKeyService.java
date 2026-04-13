package com.dustin.processingplatformbackend.apikey.service;

import java.util.List;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.apikey.dto.ApiKeyResponse;
import com.dustin.processingplatformbackend.apikey.model.ApiKey;
import com.dustin.processingplatformbackend.apikey.repository.ApiKeyRepository;
import com.dustin.processingplatformbackend.apikey.util.ApiKeyGenerator;
import com.dustin.processingplatformbackend.apikey.util.GeneratedApiKey;
@Service
public class ApiKeyService {

    private final ApiKeyRepository apiKeyRepository;
    private final PasswordEncoder passwordEncoder;

    public ApiKeyService(ApiKeyRepository apiKeyRepository, PasswordEncoder passwordEncoder) {
        this.apiKeyRepository = apiKeyRepository;
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


    public List<ApiKeyResponse> getApiKeys(UUID userId) {
        return apiKeyRepository.findAllByUserId(userId)
            .stream()
            .map(apiKey -> new ApiKeyResponse(
                apiKey.getId(),
                null,
                apiKey.getCreatedAt()
            ))
            .toList();
    }
}
