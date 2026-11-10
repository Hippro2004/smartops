package com.smartops.smartops_backend.config;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.smartops.smartops_backend.modules.user.entities.Gender;
import com.smartops.smartops_backend.modules.user.entities.Role;
import com.smartops.smartops_backend.modules.user.entities.User;
import com.smartops.smartops_backend.modules.user.repositories.UserRepo;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminSeeder.class);

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username:}")
    private String username;

    @Value("${app.admin.email:}")
    private String email;

    @Value("${app.admin.password:}")
    private String password;

    @Override
    public void run(ApplicationArguments args) {
        if (username.isBlank() || email.isBlank() || password.isBlank()) {
            log.warn("Admin seeding skipped: ADMIN_USERNAME / ADMIN_EMAIL / ADMIN_PASSWORD not set");
            return;
        }
        if (password.length() < 8) {
            throw new IllegalStateException("ADMIN_PASSWORD must be at least 8 characters");
        }

        if (userRepo.existsByUsername(username) || userRepo.existsByEmail(email)) {
            log.info("Admin seeding skipped: user already exists");
            return;
        }

        User admin = User.builder()
                .username(username.trim().toLowerCase())
                .email(email)
                .password(passwordEncoder.encode(password.trim().toLowerCase()))
                .firstname("Admin")
                .surname("System")
                .gender(Gender.UNSPECIFIED)
                .contact("-")
                .roles(new HashSet<>(Set.of(Role.ADMIN, Role.USER)))
                .build();

        userRepo.save(admin);
        log.info("Created admin user '{}'", username); // ไม่ log รหัสผ่าน
    }
}