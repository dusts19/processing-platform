package com.dustin.processingplatformbackend.auth.dto;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(

    @NotBlank(message = "email cannot be blank")
    @Nonnull
    String email,

    @NotBlank(message = "password cannot be blank")
    @Nonnull
    String password
) {
    
}
