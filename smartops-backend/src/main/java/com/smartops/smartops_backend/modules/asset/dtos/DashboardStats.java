package com.smartops.smartops_backend.modules.asset.dtos;

import java.util.List;

import com.smartops.smartops_backend.modules.category.dtos.CategoryCount;

public record DashboardStats(
        long totalAssets,
        long available,
        long inUser,
        long broken,
        long totalUsers,
        List<CategoryCount> byCategory) {
}
