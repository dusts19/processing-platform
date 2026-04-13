package com.dustin.processingplatformbackend.request.dto;

import java.time.Instant;
import java.util.UUID;

import com.dustin.processingplatformbackend.request.model.RequestStatus;

public record RequestLogResponse(
    UUID id,
    String httpMethod,
    String endpoint,
    int statusCode,
    RequestStatus status,
    long latencyMs,
    Instant createdAt

) {}
