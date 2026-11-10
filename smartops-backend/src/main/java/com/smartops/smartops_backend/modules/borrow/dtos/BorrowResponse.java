package com.smartops.smartops_backend.modules.borrow.dtos;

import java.time.Instant;

import com.smartops.smartops_backend.modules.borrow.entities.BorrowStatus;

import lombok.Builder;

@Builder

public record BorrowResponse(
        String assetName,
        Instant borrowedAt,
        BorrowStatus status

) {
}
