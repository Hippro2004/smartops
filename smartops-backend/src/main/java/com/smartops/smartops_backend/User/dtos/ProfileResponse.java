package com.smartops.smartops_backend.user.dtos;

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

    private String usename;

    private String email;

    private Integer gender;

    private String firstname;

    private String surname;

    private String contact;

}
