package com.smartops.smartops_backend.modules.category.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.modules.category.entities.Category;

public interface CategoryRepo extends JpaRepository<Category, Long> {
    boolean existsByName(String name);
}