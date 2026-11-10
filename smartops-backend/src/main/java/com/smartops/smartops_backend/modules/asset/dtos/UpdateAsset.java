package com.smartops.smartops_backend.modules.asset.dtos;

import com.smartops.smartops_backend.modules.asset.entities.AssetCatetory;
import com.smartops.smartops_backend.modules.asset.entities.AssetStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateAsset {

    @NotBlank
    private String name;

    @NotBlank
    private String serialNumber;

    @Pattern(regexp = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\\.(jpg|png|webp)$")
    private String image;

    @NotNull
    private AssetCatetory category;

    @NotNull
    private AssetStatus status;

    @NotBlank
    private String description;

}
