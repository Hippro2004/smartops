package com.smartops.smartops_backend.modules.assets.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.modules.assets.entities.Asset;

public interface AssetRepo extends JpaRepository<Asset, Long> {
    boolean existsByName(String name);
}
