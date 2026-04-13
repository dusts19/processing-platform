package com.dustin.processingplatformbackend.security;

import java.util.UUID;

public record AuthPrincipal(
    UUID userId,
    UUID apikeyId,
    AuthType authType
) {
    
}
