package com.smartops.smartops_backend.modules.user.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestLogin {

    @NotBlank(message = "กรุณากรอกชื่อผู้ใช้")
    @Size(min = 8, max = 50, message = "ชื่อผู้ใช้ต้องมี 8 - 50 ตัวอักษร")
    @Pattern(regexp = "^[A-Za-z0-9._-]*$", message = "ใช้ได้เฉพาะ a-z, 0-9 และ . _ -")
    private String username;

    @NotBlank(message = "กรุณากรอกรหัสผ่าน")
    @Size(min = 8, max = 32, message = "รหัสผ่านต้องมี 8 - 32 ตัวอักษร")
    private String password;

}
