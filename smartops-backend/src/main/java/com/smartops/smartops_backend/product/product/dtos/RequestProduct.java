package com.smartops.smartops_backend.product.product.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestProduct {

    @NotBlank
    private String name;

    @NotBlank
    private String image;

}
