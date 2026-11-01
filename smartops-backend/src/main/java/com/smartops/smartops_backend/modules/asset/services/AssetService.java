package com.smartops.smartops_backend.modules.asset.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.modules.asset.dtos.RequestAsset;
import com.smartops.smartops_backend.modules.asset.entities.Asset;
import com.smartops.smartops_backend.modules.asset.entities.AssetStatus;
import com.smartops.smartops_backend.modules.asset.repositories.AssetRepo;
import com.smartops.smartops_backend.modules.category.entities.Category;
import com.smartops.smartops_backend.modules.category.services.CategoryService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepo assetRepo;
    private final CategoryService categoryService;

    @Transactional
    public Asset createAsset(RequestAsset request) {
        if (assetRepo.existsByName(request.getName())) {
            throw new BusinessException(ErrorCode.ASSET_NAME_TAKEN);
        }

        if (assetRepo.existsBySerialNumber(request.getSerialNumber())) {
            throw new BusinessException(ErrorCode.ASSET_SERIAL_TAKEN);
        }

        Category category = categoryService.getById(request.getCategoryId());

        return assetRepo.save(Asset.builder()
                .name(request.getName())
                .serialNumber(request.getSerialNumber())
                .description(request.getDescription())
                .category(category)
                .status(AssetStatus.AVAILABLE)
                .build());
    }

}
