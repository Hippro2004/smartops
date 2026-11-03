package com.smartops.smartops_backend.modules.user.dtos;

import com.smartops.smartops_backend.modules.user.entities.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestRegister {

    @NotBlank
    private String username;

    @NotBlank
    @Size(min = 4, max = 32)
    private String password;

    @NotBlank
    @Email
    private String email;

    @NotNull
    private Gender gender;

    @NotBlank
    private String firstname;

    @NotBlank
    private String surname;

    @NotBlank
    private String contact;

}
