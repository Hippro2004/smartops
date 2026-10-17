package com.smartops.smartops_backend.User.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartops.smartops_backend.User.dtos.RequestLogin;
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

    // @PostMapping("/login")
    // public ResponseEntity<User> login(@RequestBody @Validated RequestLogin
    // requestLogin) {
    // try {

    // User user = userService.getUserByUsername(requestLogin.getUsername());
    // if (user == null)
    // return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    // } catch (Exception e) {
    // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }

}
