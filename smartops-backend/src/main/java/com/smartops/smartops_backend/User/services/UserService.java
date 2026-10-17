package com.smartops.smartops_backend.User.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.User.dtos.RequestRegister;
import com.smartops.smartops_backend.User.entities.User;
import com.smartops.smartops_backend.User.repositories.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public User getUserByUsername(String name) {
        return userRepo.findByUsername(name).orElse(null);
    }

    public boolean existsByUsername(String name) {
        return userRepo.existsByUsername(name);
    }

    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Transactional(rollbackFor = Exception.class)
    public User save(RequestRegister request) {
        User createUser = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        return userRepo.save(createUser);

    }

}
