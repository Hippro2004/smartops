package com.smartops.smartops_backend.User.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartops.smartops_backend.User.dtos.RequestRegister;
import com.smartops.smartops_backend.User.dtos.UserResponse;
import com.smartops.smartops_backend.User.entities.User;
import com.smartops.smartops_backend.User.services.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@RequestBody @Validated RequestRegister request) {
        try {

            if (userService.existsByUsername(request.getUsername())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }

            User create = userService.save(request);

            UserResponse body = new UserResponse(create.getUsername());
            return ResponseEntity.status(HttpStatus.CREATED).body(body);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
