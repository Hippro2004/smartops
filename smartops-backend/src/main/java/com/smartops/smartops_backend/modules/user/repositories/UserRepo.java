package com.smartops.smartops_backend.modules.user.repositories;

import com.smartops.smartops_backend.modules.user.entities.Role;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartops.smartops_backend.modules.user.entities.User;

public interface UserRepo extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

    boolean existsByEmail(String username);

    Optional<User> findByUsername(String name);

    List<User> findByRolesContaining(Role roles);
}
