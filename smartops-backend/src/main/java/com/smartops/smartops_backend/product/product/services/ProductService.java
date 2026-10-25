package com.smartops.smartops_backend.product.product.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.product.product.dtos.RequestProduct;
import com.smartops.smartops_backend.product.product.entities.Product;
import com.smartops.smartops_backend.product.product.repositories.ProductRepo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepo productRepo;

    @Transactional
    public Product save(RequestProduct request) {
        if (productRepo.exexistsByName(request.getName())) {
            throw new BusinessException(ErrorCode.PRODUCT_NAME_TAKEN);
        }

        return productRepo.save(Product.builder()
                .name(request.getName())
                .image(request.getImage())
                .build());

    }

    public Page<Product> getList(Pageable pageable) {
        return productRepo.findAll(pageable);
    }

}
