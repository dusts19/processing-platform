package com.dustin.processingplatformbackend.apikey.dto;

import java.time.Instant;
import java.util.UUID;

public record ApiKeyResponse(
    UUID id,
    String key,
    Instant createdAt
) {}
