package com.smartops.smartops_backend.modules.user.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUser {

    @NotBlank
    private String password;

    @NotBlank
    private String firstname;

    @NotBlank
    private String surname;

    @NotNull
    private Integer gender;

    @NotBlank
    private String contact;

}
