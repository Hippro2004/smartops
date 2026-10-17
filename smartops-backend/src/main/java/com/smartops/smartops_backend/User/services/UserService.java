package com.smartops.smartops_backend.User.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartops.smartops_backend.User.entities.User;
import com.smartops.smartops_backend.User.repositories.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;

    public User getUserByUsername(String name) {
        return userRepo.findByUsername(name).orElse(null);
    }

    @Transactional(rollbackFor = Exception.class)
    public void register(User user) {
        if (user != null) {

        }
    }

}
