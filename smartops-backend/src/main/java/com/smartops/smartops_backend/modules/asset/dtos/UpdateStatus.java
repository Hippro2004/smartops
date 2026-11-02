package com.smartops.smartops_backend.modules.asset.dtos;

import com.smartops.smartops_backend.modules.asset.entities.AssetStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateStatus {
    @NotNull
    private AssetStatus status;
}
