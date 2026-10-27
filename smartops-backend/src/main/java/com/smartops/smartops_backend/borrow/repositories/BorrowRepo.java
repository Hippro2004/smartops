package com.smartops.smartops_backend.borrow.repositories;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.borrow.entities.BorrowRecord;
import com.smartops.smartops_backend.borrow.entities.BorrowStatus;

public interface BorrowRepo extends JpaRepository<BorrowRecord, Long> {
    Optional<BorrowRecord> findByUserIdAndProductId(Long userId, Long productId);

    boolean existsByProductIdAndStatusIn(Long productId, Collection<BorrowStatus> status);
}
