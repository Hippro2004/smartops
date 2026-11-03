package com.smartops.smartops_backend.modules.auth.dtos;

public record TokenResponse(String accessToken, String refreshToken, long expiresIn) {
}