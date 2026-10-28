package com.smartops.smartops_backend.modules.productType.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.modules.productType.entities.ProductType;

public interface ProductTypeRepo extends JpaRepository<ProductType, Long> {

}
