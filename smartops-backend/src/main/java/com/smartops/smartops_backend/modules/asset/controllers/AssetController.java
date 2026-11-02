package com.smartops.smartops_backend.modules.asset.controllers;

import com.smartops.smartops_backend.modules.asset.dtos.UpdateAsset;
import org.springframework.web.bind.annotation.*;

import com.smartops.smartops_backend.common.dto.PageResponse;
import com.smartops.smartops_backend.modules.asset.dtos.AssetResponse;
import com.smartops.smartops_backend.modules.asset.dtos.RequestAsset;
import com.smartops.smartops_backend.modules.asset.entities.Asset;
import com.smartops.smartops_backend.modules.asset.services.AssetService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

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

    @GetMapping("/all-assets")
    public PageResponse<AssetResponse> getAllAssets(
            @PageableDefault(size = 10, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<AssetResponse> assets = assetService.getAllAsset(pageable).map(this::toResponse);
        return PageResponse.from(assets);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        assetService.deleteAssetById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/updateAsset")
    public ResponseEntity<AssetResponse> updateAsset(@RequestParam Long id, UpdateAsset updateAsset) {

        return
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
