package com.smartops.smartops_backend.modules.asset.dtos;

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
public class AssetResponse {

    private String name;
    private String serialNumber;
    private String categoryName;
    private String status;
    private String description;

}
