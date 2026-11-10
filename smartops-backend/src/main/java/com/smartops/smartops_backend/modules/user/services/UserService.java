package com.smartops.smartops_backend.modules.user.services;

import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;
import com.smartops.smartops_backend.modules.user.dtos.RequestRegister;
import com.smartops.smartops_backend.modules.user.dtos.UpdateUser;
import com.smartops.smartops_backend.modules.user.entities.Role;
import com.smartops.smartops_backend.modules.user.entities.User;
import com.smartops.smartops_backend.modules.user.repositories.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User create(RequestRegister request) {
        String username = request.getUsername().trim().toLowerCase();

        if (userRepo.existsByUsername(username)) {
            throw new BusinessException(ErrorCode.USERNAME_TAKEN);
        }

        if (userRepo.existsByEmail(request.getEmail())) {
            throw new BusinessException(ErrorCode.EMAIL_TAKEN);
        }

        User createUser = User.builder()
                .username(request.getUsername())
                .roles(Set.of(Role.USER))
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .surname(request.getSurname())
                .gender(request.getGender())
                .contact(request.getContact())
                .build();

        return userRepo.save(createUser);

    }

    public User login(String username, String password) {
        return userRepo.findByUsername(username.trim().toLowerCase())
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_CREDENTIALS));
    }

    public User getById(Long id) {
        return userRepo.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    public User getByUsername(String name) {
        return userRepo.findByUsername(name.trim().toLowerCase())
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    public User updateProfile(String username, UpdateUser request) {
        String usernameToLower = username.trim().toLowerCase();
        User user = userRepo.findByUsername(usernameToLower)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        if (userRepo.existsByContactAndUsernameNot(request.getContact(), usernameToLower)) {
            throw new BusinessException(ErrorCode.CONTACT_TAKEN);
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstname(request.getFirstname());
        user.setSurname(request.getSurname());
        user.setGender(request.getGender());
        user.setContact(request.getContact());

        return user;

    }

    public long getUserCount() {
        return userRepo.count();
    }

    // public boolean authenticate(String username, String rawPassword) {
    // User user = getUserByUsername(username);
    // if (user == null) {
    // return false;
    // }
    // return passwordEncoder.matches(rawPassword, user.getPassword());
    // }

}
