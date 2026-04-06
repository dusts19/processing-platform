package com.dustin.processingplatformbackend.process.dto;

public record ProcessResponse(

    int length,

    int wordCount,

    String uppercase,

    long processingTimeMs
) {}
