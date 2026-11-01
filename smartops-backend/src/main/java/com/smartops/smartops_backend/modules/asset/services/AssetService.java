package com.smartops.smartops_backend.modules.asset.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.modules.asset.dtos.RequestAsset;
import com.smartops.smartops_backend.modules.asset.entities.Asset;
import com.smartops.smartops_backend.modules.asset.entities.AssetCagetory;
import com.smartops.smartops_backend.modules.asset.entities.AssetStatus;
import com.smartops.smartops_backend.modules.asset.repositories.AssetRepo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepo assetRepo;

    @Transactional
    public Asset createAsset(RequestAsset request) {
        if (assetRepo.existsByName(request.getName())) {
            throw new BusinessException(ErrorCode.ASSET_TAKEN);
        }
        return assetRepo.save(Asset.builder()
                .name(request.getName())
                .serialNumber(request.getSerialNumber())
                .status(AssetStatus.AVAILABLE)
                .build());
    }

}
