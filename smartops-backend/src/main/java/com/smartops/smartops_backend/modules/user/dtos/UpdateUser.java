package com.smartops.smartops_backend.modules.user.dtos;

import com.smartops.smartops_backend.modules.user.entities.Gender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUser {

    @NotBlank
    @Size(min = 8, max = 32)
    private String password;

    @NotBlank
    @Size(max = 50)
    private String firstname;

    @NotBlank
    @Size(max = 50)
    private String surname;

    @NotNull
    private Gender gender;

    @NotBlank
    @Size(max = 10)
    private String contact;

}
