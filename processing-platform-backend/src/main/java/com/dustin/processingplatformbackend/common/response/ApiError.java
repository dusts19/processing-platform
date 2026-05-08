package com.dustin.processingplatformbackend.common.response;

public record ApiError(
    String message,
    int status
) {
    
}
