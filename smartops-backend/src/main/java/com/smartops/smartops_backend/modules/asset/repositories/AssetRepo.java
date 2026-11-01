package com.smartops.smartops_backend.modules.asset.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.modules.asset.entities.Asset;

public interface AssetRepo extends JpaRepository<Asset, Long> {
    boolean existsByName(String name);

    boolean existsBySerialNumber(String serialNumber);

}
