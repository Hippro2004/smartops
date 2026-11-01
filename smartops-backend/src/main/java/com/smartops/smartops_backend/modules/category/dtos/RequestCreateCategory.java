package com.smartops.smartops_backend.modules.category.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestCreateCategory {

    @NotBlank
    private String name;

}
