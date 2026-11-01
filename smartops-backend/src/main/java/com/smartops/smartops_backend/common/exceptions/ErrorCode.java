package com.smartops.smartops_backend.common.exceptions;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    // --- User ---
    USERNAME_TAKEN(HttpStatus.CONFLICT, "Username already exists"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    EMAIL_TAKEN(HttpStatus.CONFLICT, "Email already exists"),
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid username or password"),
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "Validation failed"),
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong"),

    // --- Aseet ---
    ASSET_TAKEN(HttpStatus.CONFLICT, "Asset already exists"),
    ASSET_NOT_FOUND(HttpStatus.NOT_FOUND, "Asset not found"),

    // --- Borrowed Record ---
    BORROW_NOT_FOUND(HttpStatus.NOT_FOUND, "Borrow not found")

    ;

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
