package com.smartops.smartops_backend.modules.asset.services;

import java.util.Map;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.modules.asset.dtos.DashboardStats;
import com.smartops.smartops_backend.modules.asset.dtos.RequestAsset;
import com.smartops.smartops_backend.modules.asset.dtos.UpdateAsset;
import com.smartops.smartops_backend.modules.asset.dtos.UpdateStatus;
import com.smartops.smartops_backend.modules.asset.entities.Asset;
import com.smartops.smartops_backend.modules.asset.entities.AssetStatus;
import com.smartops.smartops_backend.modules.asset.repositories.AssetRepo;
import com.smartops.smartops_backend.modules.category.entities.Category;
import com.smartops.smartops_backend.modules.category.services.CategoryService;
import com.smartops.smartops_backend.modules.user.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepo assetRepo;
    private final CategoryService categoryService;
    private final UserService userService;
    private static final Map<AssetStatus, Set<AssetStatus>> ASSET_STATUS = Map.of(
            AssetStatus.AVAILABLE, Set.of(AssetStatus.IN_USE, AssetStatus.UNDER_MAINTENANCE, AssetStatus.RETIRED),
            AssetStatus.IN_USE, Set.of(AssetStatus.AVAILABLE, AssetStatus.UNDER_MAINTENANCE),
            AssetStatus.UNDER_MAINTENANCE, Set.of(AssetStatus.AVAILABLE),
            AssetStatus.RETIRED, Set.of());

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

    public Asset getById(Long id) {
        return assetRepo.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.CATEGORY_NOT_FOUND));
    }

    public Page<Asset> getAllAsset(Pageable pageable) {
        return assetRepo.findAll(pageable);
    }

    @Transactional
    public void deleteAssetById(Long id) {
        assetRepo.deleteById(id);
    }

    @Transactional
    public Asset updateAsset(Long id, UpdateAsset request) {
        Asset asset = assetRepo.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.ASSET_NOT_FOUND));

        if (assetRepo.existsByNameAndIdNot(request.getName(), id)) {
            throw new BusinessException(ErrorCode.ASSET_NAME_TAKEN);
        }

        if (assetRepo.existsBySerialNumberAndIdNot(request.getSerialNumber(), id)) {
            throw new BusinessException(ErrorCode.ASSET_SERIAL_TAKEN);
        }

        Category category = categoryService.getById(request.getCategoryId());

        asset.setName(request.getName());
        asset.setSerialNumber(request.getSerialNumber());
        asset.setCategory(category);
        asset.setDescription(request.getDescription());

        return asset;
    }

    @Transactional
    public Asset changeStatus(Long id, UpdateStatus updateStatus) {
        Asset asset = assetRepo.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.ASSET_NOT_FOUND));

        if (!ASSET_STATUS.get(asset.getStatus()).contains(updateStatus.getStatus())) {
            throw new BusinessException(ErrorCode.INVALID_STATUS_TRANSITION);
        }

        asset.setStatus(updateStatus.getStatus());
        return asset;
    }

    public DashboardStats getStats() {
        return new DashboardStats(
                assetRepo.count(),
                assetRepo.countByStatus(AssetStatus.AVAILABLE),
                assetRepo.countByStatus(AssetStatus.IN_USE),
                assetRepo.countByStatus(AssetStatus.RETIRED),
                userService.getUserCount(),
                assetRepo.countByCategory()

        );
    }

}
