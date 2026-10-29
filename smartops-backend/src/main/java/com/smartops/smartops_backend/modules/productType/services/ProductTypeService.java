package com.smartops.smartops_backend.modules.productType.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.modules.productType.dtos.RequestCreateProductType;
import com.smartops.smartops_backend.modules.productType.entities.ProductType;
import com.smartops.smartops_backend.modules.productType.repositories.ProductTypeRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductTypeService {

    private final ProductTypeRepo productTypeRepo;

    @Transactional
    public ProductType save(RequestCreateProductType request) {
        if (productTypeRepo.existsByName(request.getProductTypeName())) {
            throw new BusinessException(ErrorCode.PRODUCT_TYPE_TAKEN);
        }

        return productTypeRepo.save(ProductType.builder().name(request.getProductTypeName()).build());
    }

    public ProductType getById(Long id) {
        return productTypeRepo.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_TYPE_NOT_FOUND));
    }

    public List<ProductType> getList() {
        return productTypeRepo.findAll();
    }

}
