package com.dustin.processingplatformbackend.apikey.util;

public class ApiKeyMaskingUtil {

    public static String mask(String prefix, String suffix) {
        return prefix + "****" + suffix;
    }
}