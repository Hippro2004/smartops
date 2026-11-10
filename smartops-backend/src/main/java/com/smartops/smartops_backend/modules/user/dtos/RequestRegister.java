package com.smartops.smartops_backend.modules.user.dtos;

import com.smartops.smartops_backend.modules.user.entities.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestRegister {

    @NotBlank(message = "Username is required.")
    @Size(min = 8, max = 50, message = "Username must be 8–50 characters long.")
    @Pattern(regexp = "^[A-Za-z0-9._-]*$", message = "Only a-z, 0-9, period, underscore, and hyphen are allowed.")
    private String username;

    @NotBlank(message = "Password is required.")
    @Size(min = 8, max = 32, message = "Password must be 8–32 characters long.")
    private String password;

    @NotBlank(message = "Email is required.")
    @Size(max = 254, message = "Email must not exceed 254 characters.")
    @Email(message = "Enter a valid email address.")
    private String email;

    @NotNull(message = "Gender is required.")
    private Gender gender;

    @NotBlank(message = "First name is required.")
    @Size(max = 50)
    private String firstname;

    @NotBlank(message = "Last name is required.")
    @Size(max = 50)
    private String surname;

    @NotBlank(message = "Contact number is required.")
    @Size(max = 10)
    private String contact;

}
