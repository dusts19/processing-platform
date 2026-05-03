package com.dustin.processingplatformbackend.requestlog.dto;

import java.util.UUID;

import com.dustin.processingplatformbackend.requestlog.model.RequestStatus;

public record RequestLogResponse(
    UUID id,
    String httpMethod,
    String endpoint,
    int statusCode,
    RequestStatus status,
    long latencyMs,
    String createdAt

) {}
