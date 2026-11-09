package com.smartops.smartops_backend.modules.asset.repositories;

import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.smartops.smartops_backend.modules.asset.entities.Asset;
import com.smartops.smartops_backend.modules.asset.entities.AssetStatus;
import com.smartops.smartops_backend.modules.category.dtos.CategoryCount;

public interface AssetRepo extends JpaRepository<Asset, Long> {
    boolean existsByName(String name);

    boolean existsByNameAndIdNot(String name, Long id);

    boolean existsBySerialNumber(String serialNumber);

    boolean existsBySerialNumberAndIdNot(String serialNumber, Long id);

    boolean existsByIdAndStatusIn(Long assetId, Collection<AssetStatus> status);

    Page<Asset> findAll(Pageable pageable);

    long countByStatus(AssetStatus status);

    @Query("select CategoryCount(a.category, count(a)) from Asset a group by a.category")
    List<CategoryCount> countByCategory();
}
