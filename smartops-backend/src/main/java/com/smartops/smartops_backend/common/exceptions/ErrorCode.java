package com.smartops.smartops_backend.common.exceptions;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    // --- User ---
    USERNAME_TAKEN(HttpStatus.CONFLICT, "Username already exists"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    EMAIL_TAKEN(HttpStatus.CONFLICT, "Email already exists"),
    CONTACT_TAKEN(HttpStatus.CONFLICT, "Contact already exists"),
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid username or password"),
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "Validation failed"),

    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong"),

    // --- Aseet ---
    ASSET_NAME_TAKEN(HttpStatus.CONFLICT, "Asset Name already exists"),
    ASSET_NOT_FOUND(HttpStatus.NOT_FOUND, "Asset not found"),
    ASSET_SERIAL_TAKEN(HttpStatus.CONFLICT, "Asset serial already exists"),

    ASSET_ALREADY_BORROWED(HttpStatus.CONFLICT, "Asset "),

    // --- Category ---
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "Category not found"),
    CATEGORY_NAME_TAKEN(HttpStatus.CONFLICT, "Category name already exists"),

    // --- Borrowed Record ---
    BORROW_NOT_FOUND(HttpStatus.NOT_FOUND, "Borrow not found"),

    INVALID_STATUS_TRANSITION(HttpStatus.CONFLICT, "Cannot change asset to this status"),

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
