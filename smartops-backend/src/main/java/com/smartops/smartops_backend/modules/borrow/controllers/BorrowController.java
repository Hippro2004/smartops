package com.smartops.smartops_backend.modules.borrow.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartops.smartops_backend.common.dtos.PageResponse;
import com.smartops.smartops_backend.modules.borrow.dtos.BorrowResponse;
import com.smartops.smartops_backend.modules.borrow.dtos.RequestBorrow;
import com.smartops.smartops_backend.modules.borrow.entities.BorrowRecord;
import com.smartops.smartops_backend.modules.borrow.services.BorrowService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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

    // @PostMapping("/create")
    // public ResponseEntity<BorrowResponse> createBorrow(@RequestBody @Validated
    // RequestBorrow request) {
    // BorrowRecord borrow = borrowService.createBorrow(request);
    // return ResponseEntity.ok(BorrowResponse.builder()
    // .assetName(borrow.getAsset().getName())
    // .borrowedAt(borrow.getBorrowedAt())
    // .status(borrow.getStatus().name())
    // .build());

    @PostMapping("/create")
    public ResponseEntity<BorrowResponse> createBorrow(@AuthenticationPrincipal Jwt jwt,
            @RequestBody @Validated RequestBorrow request) {
        Long userId = Long.valueOf(jwt.getSubject());
        BorrowRecord borrow = borrowService.createBorrow(request, userId);
        return ResponseEntity.ok(BorrowResponse.builder()
                .assetName(borrow.getAsset().getName())
                .borrowedAt(borrow.getBorrowedAt())
                .status(borrow.getStatus().name())
                .build());
    }

    @GetMapping("/{username}")
    public PageResponse<BorrowResponse> getMyBorrowed(
            @PathVariable Long userId,
            @PageableDefault(sort = "borrowedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<BorrowResponse> page = borrowService.getListBorrowByUserId(userId, pageable)
                .map(b -> BorrowResponse.builder()
                        .assetName(b.getAsset().getName())
                        .borrowedAt(b.getBorrowedAt())
                        .status(b.getStatus().toString())
                        .build());
        return PageResponse.from(page);
    }

}
