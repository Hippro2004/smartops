package com.smartops.smartops_backend.modules.productType.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartops.smartops_backend.modules.productType.dtos.ProductTypeResponse;
import com.smartops.smartops_backend.modules.productType.dtos.RequestCreateProductType;
import com.smartops.smartops_backend.modules.productType.entities.ProductType;
import com.smartops.smartops_backend.modules.productType.services.ProductTypeService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/product-types")
@RequiredArgsConstructor
public class ProductTypeController {

    private final ProductTypeService productTypeService;

    @GetMapping("/list-product-type")
    public ResponseEntity<List<ProductTypeResponse>> getProductTypes() {
        List<ProductTypeResponse> productTypes = productTypeService.getList().stream()
                .map(p -> new ProductTypeResponse(p.getName())).toList();
        return ResponseEntity.ok(productTypes);
    }

    @PostMapping("/create-product-type")
    public ResponseEntity<ProductType> createProductType(@RequestBody @Validated RequestCreateProductType request) {
        ProductType created = null;

        return ResponseEntity.ok(created);
    }

}
