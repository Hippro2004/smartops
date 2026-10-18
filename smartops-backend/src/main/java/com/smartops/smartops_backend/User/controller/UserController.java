package com.smartops.smartops_backend.User.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartops.smartops_backend.User.dtos.RequestLogin;
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
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@RequestBody @Validated RequestRegister request) {
        User created = userService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new UserResponse(created.getUsername()));

        // try {

        // if (userService.existsByUsername(request.getUsername())) {
        // return ResponseEntity.status(HttpStatus.CONFLICT).build();
        // }

        // if (userService.existsByEmail(request.getEmail())) {
        // return ResponseEntity.status(HttpStatus.CONFLICT).build();
        // }

        // User create = userService.save(request);

        // UserResponse body = new UserResponse(create.getUsername());
        // return ResponseEntity.status(HttpStatus.CREATED).body(body);
        // } catch (Exception e) {
        // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        // }
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> loginUser(@RequestBody @Validated RequestLogin request) {
        User user = userService.login(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(new UserResponse(user.getUsername()));

        // try {
        // // User user = userService.getUserByUsername(request.getUsername());

        // // if (user == null) {
        // // return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        // // }

        // if (!userService.authenticate(request.getUsername(), request.getPassword()))
        // {
        // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        // }
        // return ResponseEntity.ok(new UserResponse(request.getUsername()));

        // } catch (Exception e) {
        // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        // }
    }

}
