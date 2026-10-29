package com.smartops.smartops_backend.modules.assets.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestAsset {

    @NotBlank
    private String name;

    @NotBlank
    private String image;

    @NotNull
    @Min(0)
    @Max(2)
    private Long productTypeId;

}
