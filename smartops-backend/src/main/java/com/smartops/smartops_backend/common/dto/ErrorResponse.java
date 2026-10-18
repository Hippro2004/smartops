package com.smartops.smartops_backend.common.dto;

import java.time.Instant;
import java.util.Map;

public record ErrorResponse(
        String code,
        String message,
        Map<String, String> errors,
        Instant timestamp) {

    public static ErrorResponse of(String code, String message) {
        return new ErrorResponse(code, message, null, Instant.now());
    }

    public static ErrorResponse of(String code, String message, Map<String, String> errors) {
        return new ErrorResponse(code, message, errors, Instant.now());
    }
}
