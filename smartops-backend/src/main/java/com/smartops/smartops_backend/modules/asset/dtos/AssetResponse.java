package com.smartops.smartops_backend.modules.asset.dtos;

import lombok.Builder;

@Builder
public record AssetResponse(
                String name,
                String serialNumber,
                String image,
                String categoryName,
                String status,
                String description) {

}
