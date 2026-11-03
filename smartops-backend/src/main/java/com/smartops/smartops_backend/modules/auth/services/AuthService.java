package com.smartops.smartops_backend.modules.auth.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.config.JwtProperties;
import com.smartops.smartops_backend.modules.auth.dtos.TokenResponse;
import com.smartops.smartops_backend.modules.user.entities.User;
import com.smartops.smartops_backend.modules.user.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
    private final UserService userService;
    private final TokenService tokenService;
    private final RefreshTokenService refreshTokenService;
    private final JwtProperties props;

    @Transactional
    public TokenResponse login(String username, String password) {
        return issue(userService.login(username, password));
    }

    @Transactional
    public TokenResponse refresh(String rawRefreshToken) {
        return issue(refreshTokenService.consume(rawRefreshToken));
    }

    public void logout(String rawRefreshToken) {
        refreshTokenService.revoke(rawRefreshToken);
    }

    private TokenResponse issue(User user) {
        return new TokenResponse(
                tokenService.createAccessToken(user),
                refreshTokenService.create(user),
                props.accessTtlMinutes() * 60);
    }
}
