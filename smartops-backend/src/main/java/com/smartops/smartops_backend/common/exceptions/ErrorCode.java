package com.smartops.smartops_backend.common.exceptions;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    // --- USER ---
    USERNAME_TAKEN(HttpStatus.CONFLICT, "Username already exists"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    EMAIL_TAKEN(HttpStatus.CONFLICT, "Email already exists"),
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid username or password"),
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "Validation failed"),
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong"),

    // --- PRODUCT ---
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "Product not found"),
    PRODUCT_NAME_TAKEN(HttpStatus.CONFLICT, "My Name Product already exists");

    private final HttpStatus status;
    private final String message;

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    private ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

}
