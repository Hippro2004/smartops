package com.smartops.smartops_backend.modules.auth.services;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.HexFormat;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.config.JwtProperties;
import com.smartops.smartops_backend.modules.auth.entities.RefreshToken;
import com.smartops.smartops_backend.modules.auth.repositories.RefreshTokenRepo;
import com.smartops.smartops_backend.modules.user.entities.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepo repo;
    private final JwtProperties props;
    private final SecureRandom random = new SecureRandom();

    @Transactional
    public String create(User user) {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        String raw = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);

        RefreshToken t = new RefreshToken();
        t.setUser(user);
        t.setTokenHash(hash(raw)); // Store only the hash, never the raw token.
        t.setExpiresAt(Instant.now().plus(props.refreshTtlDays(), ChronoUnit.DAYS));
        repo.save(t);
        return raw;
    }

    /** Validate and revoke the current token (rotation), then return its owner. */
    // Without noRollbackFor, revocation would roll back when token reuse is detected.
    @Transactional(noRollbackFor = BusinessException.class)
    public User consume(String raw) {
        RefreshToken t = repo.findByTokenHash(hash(raw))
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN));

        if (t.getRevokedAt() != null) {
            // Reuse may indicate token theft; revoke all sessions for this user.
            repo.revokeAllByUserId(t.getUser().getId(), Instant.now());
            throw new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN);
        }
        if (t.getExpiresAt().isBefore(Instant.now())) {
            throw new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        t.setRevokedAt(Instant.now());
        return t.getUser();
    }

    @Transactional
    public void revoke(String raw) {
        repo.findByTokenHash(hash(raw)).ifPresent(t -> {
            if (t.getRevokedAt() == null)
                t.setRevokedAt(Instant.now());
        });
    }

    private static String hash(String raw) {
        try {
            byte[] d = MessageDigest.getInstance("SHA-256").digest(raw.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(d);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }

}
