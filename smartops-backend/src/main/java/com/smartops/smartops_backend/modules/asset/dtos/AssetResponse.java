package com.smartops.smartops_backend.modules.asset.dtos;

import com.smartops.smartops_backend.modules.asset.entities.AssetCatetory;
import com.smartops.smartops_backend.modules.asset.entities.AssetStatus;

import lombok.Builder;

@Builder
public record AssetResponse(
                Long id,
                String name,
                String serialNumber,
                String image,
                AssetCatetory category,
                AssetStatus status,
                String description) {

}
