package com.dustin.processingplatformbackend.apikey.util;

import java.security.SecureRandom;
import java.util.Base64;

public class ApiKeyGenerator {
    
    private static final String PUBLIC_ID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();

    public static GeneratedApiKey generate() {
        String publicId = generatePublicId(8);

        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);

        String encoded = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

        String fullKey = "sk_test_" + publicId + encoded;
        String prefix = "sk_test_" + publicId;
        return new GeneratedApiKey(fullKey, prefix);
    }


    public static String generatePublicId(int length) {
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int index = secureRandom.nextInt(PUBLIC_ID_CHARS.length());
            sb.append(PUBLIC_ID_CHARS.charAt(index));
        }

        return sb.toString();
    }
}
