package com.smartops.smartops_backend.User.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.User.entities.User;

public interface UserRepo extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

    Optional<User> findByUsername(String name);
}
