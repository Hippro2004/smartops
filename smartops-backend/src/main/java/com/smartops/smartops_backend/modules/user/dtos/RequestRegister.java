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

    @NotBlank(message = "กรุณากรอกชื่อผู้ใช้")
    @Size(min = 8, max = 50, message = "ชื่อผู้ใช้ต้องมี 8 - 50 ตัวอักษร")
    @Pattern(regexp = "^[A-Za-z0-9._-]*$", message = "ใช้ได้เฉพาะ a-z, 0-9 และ . _ -")
    private String username;

    @NotBlank(message = "กรุณากรอกรหัสผ่าน")
    @Size(min = 8, message = "รหัสต้องตั้งแต่ 8 ตัวอักษรขึ้นไป")
    private String password;

    @NotBlank(message = "กรุณากรอกรหัสผ่าน")
    @Size(max = 254, message = "อีเมลยาวเกินไป")
    @Email(message = "รูปแบบอีเมลไม่ถูกต้อง")
    private String email;

    @NotNull(message = "กรุณาเลือกเพศ")
    private Gender gender;

    @NotBlank(message = "กรุณากรอกชื่อ")
    @Size(max = 50)
    private String firstname;

    @NotBlank(message = "กรุณากรอกนามสกุล")
    @Size(max = 50)
    private String surname;

    @NotBlank(message = "กรุณากรอกเบอร์ติดต่อ")
    @Size(max = 10)
    private String contact;

}
