package com.smartops.smartops_backend.modules.assets.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartops.smartops_backend.common.dto.PageResponse;
import com.smartops.smartops_backend.modules.assets.dtos.AssetResponse;
import com.smartops.smartops_backend.modules.assets.dtos.RequestAsset;
import com.smartops.smartops_backend.modules.assets.entities.Asset;
import com.smartops.smartops_backend.modules.assets.services.AssetService;

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
public class AssetController {

    private final AssetService productService;

    @PostMapping("/save")
    public ResponseEntity<Asset> save(@RequestBody @Validated RequestAsset request) {
        Asset created = productService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Asset.builder()
                        .name(created.getName())
                        .image(created.getImage())
                        .build());
    }

    @GetMapping("/products")
    public PageResponse<AssetResponse> getProducts(@PageableDefault(size = 10, sort = "id") Pageable pageable) {
        Page<AssetResponse> page = productService.getList(pageable)
                .map(p -> new AssetResponse(p.getName(), p.getImage()));
        return PageResponse.from(page);
    }

}
