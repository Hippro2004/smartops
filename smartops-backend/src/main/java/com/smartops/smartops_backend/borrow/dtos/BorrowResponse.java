package com.smartops.smartops_backend.borrow.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowResponse {

    private String productName;
    private String borrowedAt;
    private String status;

}
