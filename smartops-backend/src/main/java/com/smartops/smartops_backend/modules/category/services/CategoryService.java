package com.smartops.smartops_backend.modules.category.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.modules.category.dtos.RequestCreateCategory;
import com.smartops.smartops_backend.modules.category.entities.Category;
import com.smartops.smartops_backend.modules.category.repositories.CategoryRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepo categoryRepo;

    @Transactional
    public Category createCategory(RequestCreateCategory request) {
        if (categoryRepo.existsByName(request.getName())) {
            throw new BusinessException(ErrorCode.CATEGORY_NAME_TAKEN);
        }

        return categoryRepo.save(Category.builder().name(request.getName()).build());
    }

    public Category getById(Long id) {
        return categoryRepo.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.CATEGORY_NOT_FOUND));
    }

    public void deleteById(Long id) {
        categoryRepo.deleteById(id);
    }

}
