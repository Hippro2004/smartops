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
    @Size(min = 4, max = 50)
    private String username;

    @NotBlank
    @Size(min = 8, max = 32)
    private String password;

    @NotBlank
    @Size(max = 254)
    @Email
    private String email;

    @NotNull
    private Gender gender;

    @NotBlank
    @Size(max = 50)
    private String firstname;

    @NotBlank
    @Size(max = 50)
    private String surname;

    @NotBlank
    @Size(max = 10)
    private String contact;

}
