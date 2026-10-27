package com.smartops.smartops_backend.borrow.dtos;

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
public class RequestBorrow {

    @NotNull
    private Long userId;

    @NotNull
    private Long productId;

    @NotNull
    @Future
    private Instant dueAt;

}
