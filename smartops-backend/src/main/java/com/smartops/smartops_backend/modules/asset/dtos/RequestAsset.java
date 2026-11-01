package com.smartops.smartops_backend.modules.asset.dtos;

import org.springframework.stereotype.Service;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Service
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestAsset {

    @NotBlank
    private String name;

    @NotBlank
    private String serialNumber;

    @NotBlank
    private String description;

}
