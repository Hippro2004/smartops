package com.smartops.smartops_backend.modules.auth.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartops.smartops_backend.modules.auth.dtos.RequestRefresh;
import com.smartops.smartops_backend.modules.auth.dtos.TokenResponse;
import com.smartops.smartops_backend.modules.auth.services.AuthService;
import com.smartops.smartops_backend.modules.user.dtos.RequestLogin;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public TokenResponse login(@RequestBody @Validated RequestLogin request) {
        return authService.login(request.getUsername(), request.getPassword());
    }

    @PostMapping("/refresh")
    public TokenResponse refresh(@RequestBody @Validated RequestRefresh request) {
        return authService.refresh(request.getRefreshToken());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody @Validated RequestRefresh request) {
        authService.logout(request.getRefreshToken());
        return ResponseEntity.noContent().build();
    }
}
