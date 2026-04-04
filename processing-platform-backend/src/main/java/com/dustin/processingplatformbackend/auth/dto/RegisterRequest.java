package com.dustin.processingplatformbackend.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(

    @NotBlank(message = "Email cannnot be blank")
    @NotNull
    String email,

    @NotBlank(message = "Password cannot be blank")
    @NotNull
    String password
) {
    
}
