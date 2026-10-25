package com.smartops.smartops_backend.product.type.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.product.type.entities.ProductType;
import com.smartops.smartops_backend.product.type.repositories.ProductTypeRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductTypeService {

    private final ProductTypeRepo productTypeRepo;

    @Transactional
    public ProductType save(ProductType productType) {
        return productTypeRepo.save(ProductType.builder().name(productType.getName()).build());
    }

}
