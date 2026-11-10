package com.smartops.smartops_backend.modules.user.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestLogin {

    @NotBlank(message = "Username is required.")
    @Size(min = 8, max = 50, message = "Username must be 8–50 characters long.")
    @Pattern(regexp = "^[A-Za-z0-9._-]*$", message = "Only a-z, 0-9, period, underscore, and hyphen are allowed.")
    private String username;

    @NotBlank(message = "Password is required.")
    @Size(min = 8, max = 32, message = "Password must be 8–32 characters long.")
    private String password;

}
