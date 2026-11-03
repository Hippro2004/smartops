package com.smartops.smartops_backend.modules.auth.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RequestRefresh {
    @NotBlank
    private String refreshToken;
}
