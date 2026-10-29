package com.smartops.smartops_backend.modules.assets.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.modules.assets.dtos.RequestAsset;
import com.smartops.smartops_backend.modules.assets.entities.Asset;
import com.smartops.smartops_backend.modules.assets.repositories.AssetRepo;
import com.smartops.smartops_backend.modules.productType.entities.ProductType;
import com.smartops.smartops_backend.modules.productType.services.ProductTypeService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepo productRepo;
    private final ProductTypeService productTypeService;

    @Transactional
    public Asset save(RequestAsset request) {
        if (productRepo.existsByName(request.getName())) {
            throw new BusinessException(ErrorCode.PRODUCT_NAME_TAKEN);
        }

        ProductType productType = productTypeService.getById(request.getProductTypeId());

        return productRepo.save(Asset.builder()
                .name(request.getName())
                .image(request.getImage())
                .productType(productType)
                .build());

    }

    public Asset getById(Long id) {
        return productRepo.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));
    }

    public Page<Asset> getList(Pageable pageable) {
        return productRepo.findAll(pageable);
    }

}
