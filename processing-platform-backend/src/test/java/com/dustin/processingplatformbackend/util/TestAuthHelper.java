package com.dustin.processingplatformbackend.util;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.dustin.processingplatformbackend.auth.dto.AuthResponse;
import com.dustin.processingplatformbackend.auth.dto.LoginRequest;
import com.dustin.processingplatformbackend.auth.dto.RegisterRequest;
// import com.fasterxml.jackson.databind.ObjectMapper;
import tools.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class TestAuthHelper {
    
    public static String registerAndLogin(
        MockMvc mockMvc,
        ObjectMapper objectMapper,
        String email
    ) throws Exception {
        
        RegisterRequest registerRequest = new RegisterRequest(email, "password123");

        mockMvc.perform(post("/api/auth/register")
                .content(objectMapper.writeValueAsString(registerRequest))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());

        LoginRequest loginRequest = new LoginRequest(email, "password123");

        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                .content(objectMapper.writeValueAsString(loginRequest))
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andReturn();

        String responseBody = loginResult.getResponse().getContentAsString();

        AuthResponse authResponse = objectMapper.readValue(responseBody, AuthResponse.class);

        return authResponse.token();
    }
}
