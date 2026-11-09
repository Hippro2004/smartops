package com.smartops.smartops_backend.modules.asset.dtos;

import com.smartops.smartops_backend.modules.asset.entities.AssetCatetory;

public interface CategoryCount {
    AssetCatetory getCategory();

    long getCount();
}
