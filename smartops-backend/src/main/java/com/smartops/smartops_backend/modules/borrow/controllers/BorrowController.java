package com.smartops.smartops_backend.modules.borrow.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartops.smartops_backend.modules.borrow.dtos.BorrowResponse;
import com.smartops.smartops_backend.modules.borrow.dtos.RequestBorrow;
import com.smartops.smartops_backend.modules.borrow.entities.BorrowRecord;
import com.smartops.smartops_backend.modules.borrow.services.BorrowService;
import com.smartops.smartops_backend.common.dto.PageResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/borrows")
@RequiredArgsConstructor
public class BorrowController {

    private final BorrowService borrowService;

    @PostMapping("/save")
    public ResponseEntity<BorrowResponse> saveBorrow(@RequestBody @Validated RequestBorrow request) {
        BorrowRecord created = borrowService.save(request);
        return ResponseEntity.ok(new BorrowResponse(
                created.getProduct().getName(),
                created.getBorrowedAt().toString(),
                created.getStatus().toString()));
    }

    @GetMapping("/user/{username}")
    public PageResponse<BorrowResponse> getMyBorrowed(
            @PathVariable Long userId,
            @PageableDefault(sort = "borrowedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<BorrowResponse> page = borrowService.getListBorrowByUserId(userId, pageable)
                .map(b -> BorrowResponse.builder()
                        .productName(b.getProduct().getName())
                        .borrowedAt(b.getBorrowedAt().toString())
                        .status(b.getStatus().toString())
                        .build());
        return PageResponse.from(page);
    }

}
