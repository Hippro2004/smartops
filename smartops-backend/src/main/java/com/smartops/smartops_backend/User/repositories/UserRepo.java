package com.smartops.smartops_backend.user.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.user.entities.User;
import com.smartops.smartops_backend.user.entities.Role;

public interface UserRepo extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

    boolean existsByEmail(String username);

    Optional<User> findByUsername(String name);

    List<User> findByRolesContaining(Role roles);
}
