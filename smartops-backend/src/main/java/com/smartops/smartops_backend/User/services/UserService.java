package com.smartops.smartops_backend.user.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.user.dtos.RequestRegister;
import com.smartops.smartops_backend.user.entities.User;
import com.smartops.smartops_backend.user.repositories.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    // public User getUserByUsername(String name) {
    // return userRepo.findByUsername(name).orElse(null);
    // }

    // public boolean existsByUsername(String name) {
    // return userRepo.existsByUsername(name);
    // }

    // public boolean existsByEmail(String email) {
    // return userRepo.existsByEmail(email);
    // }

    @Transactional
    public User save(RequestRegister request) {
        if (userRepo.existsByUsername(request.getUsername())) {
            throw new BusinessException(ErrorCode.USERNAME_TAKEN);
        }

        if (userRepo.existsByEmail(request.getEmail())) {
            throw new BusinessException(ErrorCode.EMAIL_TAKEN);
        }

        User createUser = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        return userRepo.save(createUser);

    }

    public User login(String username, String password) {
        return userRepo.findByUsername(username).filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_CREDENTIALS));
    }

    public User getById(Long id) {
        return userRepo.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    // public boolean authenticate(String username, String rawPassword) {
    // User user = getUserByUsername(username);
    // if (user == null) {
    // return false;
    // }
    // return passwordEncoder.matches(rawPassword, user.getPassword());
    // }

}
