package com.smartops.smartops_backend.modules.user.dtos;

import java.util.List;

import com.smartops.smartops_backend.modules.user.entities.Gender;

import lombok.Builder;

@Builder
public record ProfileResponse(
        String username,
        String email,
        String firstname,
        String surname,
        Gender gender,
        String contact,
        List<String> roles) {
}
