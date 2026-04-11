package com.dustin.processingplatformbackend.apikey.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dustin.processingplatformbackend.apikey.model.ApiKey;

public interface ApiKeyRepository extends JpaRepository<ApiKey, UUID>{
    List<ApiKey> findAllByUserId(UUID userId);
    Optional<ApiKey> findByPrefix(String prefix);
}
