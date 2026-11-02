package com.smartops.smartops_backend.modules.borrow.dtos;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowResponse {

    private String assetName;
    private Instant borrowedAt;
    private String status;

}
