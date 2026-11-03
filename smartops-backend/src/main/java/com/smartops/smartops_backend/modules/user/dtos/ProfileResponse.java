package com.smartops.smartops_backend.modules.user.dtos;

import com.smartops.smartops_backend.modules.user.entities.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileResponse {

    private String username;

    private String email;

    private Gender gender;

    private String firstname;

    private String surname;

    private String contact;

}
