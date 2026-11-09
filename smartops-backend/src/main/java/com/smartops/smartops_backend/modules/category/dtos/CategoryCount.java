package com.smartops.smartops_backend.modules.category.dtos;

import com.smartops.smartops_backend.modules.category.entities.Category;

public record CategoryCount(Category category, long count) {

}
