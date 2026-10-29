package com.smartops.smartops_backend.modules.borrow.services;

import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.modules.assets.entities.Asset;
import com.smartops.smartops_backend.modules.assets.services.AssetService;
import com.smartops.smartops_backend.modules.borrow.dtos.RequestBorrow;
import com.smartops.smartops_backend.modules.borrow.entities.BorrowRecord;
import com.smartops.smartops_backend.modules.borrow.entities.BorrowStatus;
import com.smartops.smartops_backend.modules.borrow.repositories.BorrowRepo;
import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.modules.user.entities.User;
import com.smartops.smartops_backend.modules.user.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BorrowService {

    private final BorrowRepo borrowRepo;
    private final UserService userService;
    private final AssetService productService;

    private static final List<BorrowStatus> ACTIVE_STATUSES = List.of(BorrowStatus.BORROWED, BorrowStatus.PENDING);

    @Transactional
    public BorrowRecord save(RequestBorrow request) {
        User user = userService.getById(request.getUserId());
        Asset product = productService.getById(request.getProductId());

        // BorrowRecord borrowRecord = getBorrowByUserIdAndProductId(user.getId(),
        // product.getId());

        if (borrowRepo.existsByProductIdAndStatusIn(product.getId(), ACTIVE_STATUSES)) {
            throw new BusinessException(ErrorCode.PRODUCT_ALREADY_BORROWED);
        }

        return borrowRepo.save(BorrowRecord.builder()
                .user(user)
                .product(product)
                .borrowedAt(Instant.now())
                .dueAt(request.getDueAt())
                .status(BorrowStatus.PENDING)
                .build());

    }

    public BorrowRecord getBorrowByUserIdAndProductId(Long userId, Long productId) {
        return borrowRepo.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new BusinessException(ErrorCode.BORROW_NOT_FOUND));
    }

    public Page<BorrowRecord> getListBorrowByUserId(Long userId, Pageable pageable) {
        return borrowRepo.findAllByUserIdOrderByBorrowedAtDesc(userId, pageable);
    }

}
