package com.dustin.processingplatformbackend.security.model;

import java.util.UUID;

public record AuthPrincipal(
    UUID userId,
    UUID apikeyId,
    AuthType authType
) {
    
}
