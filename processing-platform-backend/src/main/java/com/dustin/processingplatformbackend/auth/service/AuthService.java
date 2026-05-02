package com.dustin.processingplatformbackend.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.auth.dto.AuthResponse;
import com.dustin.processingplatformbackend.auth.dto.LoginRequest;
import com.dustin.processingplatformbackend.auth.dto.RegisterRequest;
import com.dustin.processingplatformbackend.auth.dto.RegisterResponse;
import com.dustin.processingplatformbackend.security.jwt.JwtService;
import com.dustin.processingplatformbackend.user.model.User;
import com.dustin.processingplatformbackend.user.repository.UserRepository;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthService(PasswordEncoder passwordEncoder, UserRepository userRepository, JwtService jwtService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    

    public RegisterResponse registerUser(RegisterRequest registerRequest){

        String hashedPassword = passwordEncoder.encode(registerRequest.password());

        User user = new User();
        user.setEmail(registerRequest.email());
        user.setPasswordHash(hashedPassword);

        User saved = userRepository.save(user);

        return new RegisterResponse(
            saved.getId(), 
            saved.getEmail(), 
            saved.getCreatedAt()
        );
    }

    public AuthResponse loginUser(LoginRequest loginRequest) {
        
        User user = userRepository.findByEmail(loginRequest.email())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        

        if (!passwordEncoder.matches(
            loginRequest.password(),
            user.getPasswordHash()
        )) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateAccessToken(user);

        return new AuthResponse(token);
    }
}
