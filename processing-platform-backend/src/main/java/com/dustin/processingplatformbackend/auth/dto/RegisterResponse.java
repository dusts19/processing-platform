package com.dustin.processingplatformbackend.auth.dto;

import java.time.Instant;
import java.util.UUID;

public record RegisterResponse(
    UUID id,
    String email,
    Instant createdAt
) {
    
}
