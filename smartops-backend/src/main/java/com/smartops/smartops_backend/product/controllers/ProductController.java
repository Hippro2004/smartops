package com.smartops.smartops_backend.product.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartops.smartops_backend.common.dto.PageResponse;
import com.smartops.smartops_backend.product.dtos.ProductResponse;
import com.smartops.smartops_backend.product.dtos.RequestProduct;
import com.smartops.smartops_backend.product.entities.Product;
import com.smartops.smartops_backend.product.services.ProductService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/save")
    public ResponseEntity<Product> save(@RequestBody @Validated RequestProduct request) {
        Product created = productService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Product.builder()
                        .name(created.getName())
                        .image(created.getImage())
                        .build());
    }

    @GetMapping("/products")
    public PageResponse<ProductResponse> getProducts(@PageableDefault(size = 10, sort = "id") Pageable pageable) {
        Page<ProductResponse> page = productService.getList(pageable)
                .map(p -> new ProductResponse(p.getName(), p.getImage()));
        return PageResponse.from(page);
    }

}
