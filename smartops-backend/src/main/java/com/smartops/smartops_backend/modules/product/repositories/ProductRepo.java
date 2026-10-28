package com.smartops.smartops_backend.modules.product.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.modules.product.entities.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {
    boolean existsByName(String name);
}
