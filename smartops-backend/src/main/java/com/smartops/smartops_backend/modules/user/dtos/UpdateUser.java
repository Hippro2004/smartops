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

    @NotBlank(message = "First name is required.")
    @Size(max = 50)
    private String firstname;

    @NotBlank(message = "Last name is required.")
    @Size(max = 50)
    private String surname;

    @NotBlank(message = "Current password is required.")
    @Size(min = 8, max = 32, message = "Current password must be 8–32 characters long.")
    private String currentPassword;

    @NotBlank(message = "New password is required.")
    @Size(min = 8, max = 32, message = "New password must be 8–32 characters long.")
    private String newPassword;

    @NotNull(message = "Gender is required.")
    private Gender gender;

    @NotBlank(message = "Contact number is required.")
    @Size(max = 10)
    private String contact;

}
