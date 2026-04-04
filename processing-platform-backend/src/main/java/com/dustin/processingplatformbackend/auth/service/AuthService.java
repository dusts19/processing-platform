package com.dustin.processingplatformbackend.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.auth.dto.RegisterRequest;
import com.dustin.processingplatformbackend.auth.dto.RegisterResponse;
import com.dustin.processingplatformbackend.auth.model.User;
import com.dustin.processingplatformbackend.auth.repository.UserRepository;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }
    
    public RegisterResponse registerUser(RegisterRequest registerRequest){

        String hashedPassword = passwordEncoder.encode(registerRequest.password());

        User user = new User();
        user.setEmail(registerRequest.email());
        user.setPasswordHash(hashedPassword);

        User saved = userRepository.save(user);

        return new RegisterResponse(saved.getId(), saved.getEmail(), saved.getCreatedAt());
    }

}
