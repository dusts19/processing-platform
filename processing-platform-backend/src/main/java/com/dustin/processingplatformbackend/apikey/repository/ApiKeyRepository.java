package com.dustin.processingplatformbackend.apikey.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dustin.processingplatformbackend.apikey.model.ApiKey;

public interface ApiKeyRepository extends JpaRepository<ApiKey, UUID>{
    // Optional<ApiKey> findAllByUserId(userId);
}
