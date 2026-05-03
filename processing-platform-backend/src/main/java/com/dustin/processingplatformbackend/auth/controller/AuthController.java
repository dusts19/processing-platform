package com.dustin.processingplatformbackend.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dustin.processingplatformbackend.auth.dto.AuthResponse;
import com.dustin.processingplatformbackend.auth.dto.LoginRequest;
import com.dustin.processingplatformbackend.auth.dto.RegisterRequest;
import com.dustin.processingplatformbackend.auth.dto.RegisterResponse;
import com.dustin.processingplatformbackend.auth.dto.UserResponse;
import com.dustin.processingplatformbackend.auth.service.AuthService;
import com.dustin.processingplatformbackend.user.model.User;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private AuthService authService;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    } 


    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {

        RegisterResponse registerResponse = authService.registerUser(registerRequest);

        return ResponseEntity.ok(registerResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.loginUser(loginRequest);
        return ResponseEntity.ok(authResponse);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserResponse userResponse = new UserResponse(
            user.getId(),
            user.getEmail(),
            user.getCreatedAt()
        );
        return ResponseEntity.ok(userResponse);
    }
}
