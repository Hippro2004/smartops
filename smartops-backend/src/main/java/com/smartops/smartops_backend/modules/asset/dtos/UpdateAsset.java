package com.smartops.smartops_backend.modules.asset.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateAsset {

    @NotBlank
    private String name;

    @NotBlank
    private String serialNumber;

    @NotNull
    private Long categoryId;

    private String description;

}
