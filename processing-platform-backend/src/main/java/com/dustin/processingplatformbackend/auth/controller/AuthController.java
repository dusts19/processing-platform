package com.dustin.processingplatformbackend.auth.controller;

import java.net.http.HttpResponse;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dustin.processingplatformbackend.auth.dto.AuthResponse;
import com.dustin.processingplatformbackend.auth.dto.LoginRequest;
import com.dustin.processingplatformbackend.auth.dto.RegisterRequest;
import com.dustin.processingplatformbackend.auth.dto.RegisterResponse;
import com.dustin.processingplatformbackend.auth.model.User;
import com.dustin.processingplatformbackend.auth.service.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private AuthService authService;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    } 


    @PostMapping("/register")
    public RegisterResponse registerUser(@RequestBody RegisterRequest registerRequest) {

        RegisterResponse registerResponse = authService.registerUser(registerRequest);


        return registerResponse;
    }

    @PostMapping("/login")
    public AuthResponse loginUser(@RequestBody LoginRequest loginRequest) {
        
        return authService.loginUser(loginRequest);
    }
}
