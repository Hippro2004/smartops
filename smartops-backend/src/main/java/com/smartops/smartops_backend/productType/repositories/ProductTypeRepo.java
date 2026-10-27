package com.smartops.smartops_backend.productType.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.productType.entities.ProductType;

public interface ProductTypeRepo extends JpaRepository<ProductType, Long> {

}
