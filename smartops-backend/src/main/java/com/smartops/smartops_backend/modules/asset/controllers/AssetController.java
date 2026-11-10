package com.smartops.smartops_backend.modules.asset.controllers;

import com.smartops.smartops_backend.modules.asset.dtos.UpdateAsset;
import com.smartops.smartops_backend.modules.asset.dtos.UpdateStatus;

import com.smartops.smartops_backend.common.dtos.PageResponse;
import com.smartops.smartops_backend.modules.asset.dtos.AssetResponse;
import com.smartops.smartops_backend.modules.asset.dtos.DashboardStats;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @PostMapping("/create-asset")
    public ResponseEntity<AssetResponse> createAsset(@RequestBody @Validated RequestAsset request) {
        // Asset asset = assetService.createAsset(request);
        // return ResponseEntity.ok(toResponse(asset));
        return ResponseEntity.ok(toResponse(assetService.createAsset(request)));
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

    @PutMapping("/{id}")
    public ResponseEntity<AssetResponse> updateAsset(@PathVariable Long id,
            @RequestBody @Validated UpdateAsset updateAsset) {
        // Asset updated = assetService.updateAsset(id, updateAsset);
        // return ResponseEntity.ok(toResponse(updated));
        return ResponseEntity.ok(toResponse(assetService.updateAsset(id, updateAsset)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<AssetResponse> changeStatus(@PathVariable Long id,
            @RequestBody @Validated UpdateStatus request) {
        // Asset response = assetService.changeStatus(id, request);
        // return ResponseEntity.ok(toResponse(response));
        return ResponseEntity.ok(toResponse(assetService.changeStatus(id, request)));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> dashboard() {
        return ResponseEntity.ok(assetService.getStats());
    }

    private AssetResponse toResponse(Asset a) {
        return new AssetResponse(
                a.getName(),
                a.getSerialNumber(),
                a.getImage(),
                a.getCategory().name(),
                a.getStatus().name(),
                a.getDescription());
    }

}
