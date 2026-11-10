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

    @NotBlank(message = "กรุณากรอกรหัสผ่าน")
    @Size(min = 8, max = 32, message = "รหัสผ่านต้องมี 8 - 32 ตัวอักษร")
    private String password;

    @NotBlank(message = "กรุณากรอกชื่อ")
    @Size(max = 50)
    private String firstname;

    @NotBlank(message = "กรุณากรอกนามสกุล")
    @Size(max = 50)
    private String surname;

    @NotNull(message = "กรุณาเลือกเพศ")
    private Gender gender;

    @NotBlank(message = "กรุณากรอกเบอร์ติดต่อ")
    @Size(max = 10)
    private String contact;

}
