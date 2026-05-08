package com.dustin.processingplatformbackend.common.response;

import java.time.Instant;

public record ApiResponse<T>(
    T data,
    ApiError error,
    Instant timestamp) {
    
}
