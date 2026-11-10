package com.smartops.smartops_backend.common.exceptions;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    // --- User ---
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    USERNAME_TAKEN(HttpStatus.CONFLICT, "Username already exists"),

    EMAIL_TAKEN(HttpStatus.CONFLICT, "Email already exists"),

    CONTACT_TAKEN(HttpStatus.CONFLICT, "Contact already exists"),

    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid username or password"),
    INVALID_CURRENT_PASSWORD(HttpStatus.UNAUTHORIZED, "Current password is incorrect"),
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "Validation failed"),

    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong"),

    // --- Aseet ---
    ASSET_NAME_TAKEN(HttpStatus.CONFLICT, "Asset Name already exists"),
    ASSET_NOT_FOUND(HttpStatus.NOT_FOUND, "Asset not found"),
    ASSET_SERIAL_TAKEN(HttpStatus.CONFLICT, "Asset serial already exists"),
    ASSET_DESCRIPTION_EMPTY(HttpStatus.BAD_REQUEST, "Description is empty"),

    ASSET_ALREADY_BORROWED(HttpStatus.CONFLICT, "Asset already borrowed"),

    // --- Category ---
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "Category not found"),
    CATEGORY_NAME_TAKEN(HttpStatus.CONFLICT, "Category name already exists"),

    // --- Borrowed Record ---
    BORROW_NOT_FOUND(HttpStatus.NOT_FOUND, "Borrow not found"),

    // --- Token ---
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid or expired refresh token"),

    // --- File ---
    FILE_EMPTY(HttpStatus.BAD_REQUEST, "File is empty"),
    FILE_TYPE_NOT_ALLOWED(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "File type not allowed"),
    FILE_TOO_LARGE(HttpStatus.CONTENT_TOO_LARGE, "File size exceeds the limit"),
    FILE_NOT_FOUND(HttpStatus.NOT_FOUND, "File not found"),

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
