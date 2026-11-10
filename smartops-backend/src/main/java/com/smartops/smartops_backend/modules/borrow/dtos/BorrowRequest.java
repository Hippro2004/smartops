package com.smartops.smartops_backend.modules.borrow.dtos;

import java.time.Instant;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BorrowRequest {

    // @NotNull
    // private Long userId;

    @NotNull(message = "Asset ID is required.")
    private Long assetId;

    @NotNull(message = "Due date and time are required.")
    @Future
    private Instant dueAt;

}
