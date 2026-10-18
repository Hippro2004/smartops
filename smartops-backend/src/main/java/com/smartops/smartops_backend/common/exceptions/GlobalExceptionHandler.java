package com.smartops.smartops_backend.common.exceptions;

import java.util.LinkedHashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.smartops.smartops_backend.common.dto.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // 1) error ที่เราตั้งใจโยนเอง (ซ้ำ, รหัสผิด ฯลฯ)
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException ex) {
        ErrorCode ec = ex.getErrorCode();
        return ResponseEntity
                .status(ec.getStatus())
                .body(ErrorResponse.of(ec.name(), ec.getMessage()));
    }

    // 2) @Validated ไม่ผ่าน -> บอกว่าช่องไหนผิด
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(e -> errors.putIfAbsent(e.getField(), e.getDefaultMessage()));

        ErrorCode ec = ErrorCode.VALIDATION_FAILED;
        return ResponseEntity
                .status(ec.getStatus())
                .body(ErrorResponse.of(ec.name(), ec.getMessage(), errors));
    }

    // 3) ที่เหลือทั้งหมด: log เต็มฝั่ง server แต่ไม่ส่งรายละเอียดออกไป
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(Exception ex) {
        log.error("Unexpected error", ex);
        ErrorCode ec = ErrorCode.INTERNAL_ERROR;
        return ResponseEntity
                .status(ec.getStatus())
                .body(ErrorResponse.of(ec.name(), ec.getMessage()));
    }

}
