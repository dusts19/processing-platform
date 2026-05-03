package com.dustin.processingplatformbackend.common.exception;

public record ApiError(
    String message,
    int status
) {
    
}
