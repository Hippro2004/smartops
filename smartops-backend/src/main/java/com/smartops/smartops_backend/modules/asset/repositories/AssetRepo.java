package com.smartops.smartops_backend.modules.asset.repositories;

import java.util.Collection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.modules.asset.entities.Asset;
import com.smartops.smartops_backend.modules.asset.entities.AssetStatus;

public interface AssetRepo extends JpaRepository<Asset, Long> {
    boolean existsByName(String name);

    boolean existsByNameAndIdNot(String name, Long id);

    boolean existsBySerialNumber(String serialNumber);

    boolean existsBySerialNumberAndIdNot(String serialNumber, Long id);

    boolean existsByIdAndStatusIn(Long assetId, Collection<AssetStatus> status);

    Page<Asset> findAll(Pageable pageable);
}
