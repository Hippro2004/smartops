package com.smartops.smartops_backend.modules.asset.dtos;

import java.util.List;

public record DashboardStats(
        long totalAssets,
        long available,
        long inUser,
        long retired,
        long totalUsers,
        List<CategoryCount> byCategory) {
}
