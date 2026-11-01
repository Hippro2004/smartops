package com.smartops.smartops_backend.modules.asset.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartops.smartops_backend.modules.asset.dtos.AssetResponse;
import com.smartops.smartops_backend.modules.asset.dtos.RequestAsset;
import com.smartops.smartops_backend.modules.asset.entities.Asset;
import com.smartops.smartops_backend.modules.asset.services.AssetService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @PostMapping("/create-asset")
    public ResponseEntity<AssetResponse> createAsset(@RequestBody @Validated RequestAsset request) {
        Asset asset = assetService.createAsset(request);

        return ResponseEntity.ok(toResponse(asset));
    }

    private AssetResponse toResponse(Asset a) {
        return new AssetResponse(
                a.getName(),
                a.getSerialNumber(),
                a.getCategory().getName(),
                a.getStatus().name(),
                a.getDescription());
    }

}
