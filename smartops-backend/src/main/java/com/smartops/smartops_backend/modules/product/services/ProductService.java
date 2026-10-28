package com.smartops.smartops_backend.modules.product.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.modules.product.dtos.RequestProduct;
import com.smartops.smartops_backend.modules.product.entities.Product;
import com.smartops.smartops_backend.modules.product.repositories.ProductRepo;
import com.smartops.smartops_backend.modules.productType.entities.ProductType;
import com.smartops.smartops_backend.modules.productType.services.ProductTypeService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepo productRepo;
    private final ProductTypeService productTypeService;

    @Transactional
    public Product save(RequestProduct request) {
        if (productRepo.existsByName(request.getName())) {
            throw new BusinessException(ErrorCode.PRODUCT_NAME_TAKEN);
        }

        ProductType productType = productTypeService.getById(request.getProductTypeId());

        return productRepo.save(Product.builder()
                .name(request.getName())
                .image(request.getImage())
                .productType(productType)
                .build());

    }

    public Product getById(Long id) {
        return productRepo.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));
    }

    public Page<Product> getList(Pageable pageable) {
        return productRepo.findAll(pageable);
    }

}
