package com.smartops.smartops_backend.modules.user.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartops.smartops_backend.modules.user.dtos.ProfileResponse;
import com.smartops.smartops_backend.modules.user.dtos.RequestRegister;
import com.smartops.smartops_backend.modules.user.dtos.UpdateUser;
import com.smartops.smartops_backend.modules.user.entities.Role;
import com.smartops.smartops_backend.modules.user.entities.User;
import com.smartops.smartops_backend.modules.user.services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Void> registerUser(@RequestBody @Validated RequestRegister request) {
        userService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // @PostMapping("/login")
    // public ResponseEntity<UserResponse> loginUser(@RequestBody @Validated
    // RequestLogin request) {
    // User user = userService.login(request.getUsername(), request.getPassword());
    // return ResponseEntity.ok(new UserResponse(user.getUsername(),
    // user.getRoles().toString()));
    // }

    private ProfileResponse toProfileResponse(User u) {
        List<String> roles = u.getRoles().stream().map(Role::name).sorted().toList();
        return new ProfileResponse(
                u.getUsername(),
                u.getEmail(),
                u.getFirstname(),
                u.getSurname(),
                u.getGender(),
                u.getContact(),
                roles);
    }

    // @GetMapping("/profile")
    // public ResponseEntity<ProfileResponse> getProfileUser(@RequestHeader String
    // username, Authentication auth) {
    // return
    // ResponseEntity.ok(toProfileResponse(userService.getByUsername(username)));
    // }

    @GetMapping("/me")
    public ProfileResponse me(@AuthenticationPrincipal Jwt jwt) {
        Long userId = Long.valueOf(jwt.getSubject());
        User user = userService.getById(userId);
        return toProfileResponse(user);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ProfileResponse> updateProfileUser(@RequestHeader String name,
            @RequestBody @Validated UpdateUser request) {
        return ResponseEntity.ok(toProfileResponse(userService.updateProfile(name, request)));
    }

}
