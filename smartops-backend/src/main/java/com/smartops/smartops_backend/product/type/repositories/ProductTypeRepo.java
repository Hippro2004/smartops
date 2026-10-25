package com.smartops.smartops_backend.product.type.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.product.type.entities.ProductType;

public interface ProductTypeRepo extends JpaRepository<ProductType, Long> {

}
