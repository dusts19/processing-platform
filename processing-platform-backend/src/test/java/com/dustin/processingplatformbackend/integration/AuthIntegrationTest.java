package com.dustin.processingplatformbackend.integration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.dustin.processingplatformbackend.auth.dto.AuthResponse;
import com.dustin.processingplatformbackend.auth.dto.LoginRequest;
import com.dustin.processingplatformbackend.auth.dto.RegisterRequest;
// import com.fasterxml.jackson.databind.ObjectMapper;
import tools.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.MockMvcBuilder.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;


@SpringBootTest
@AutoConfigureMockMvc
public class AuthIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldRegisterAndLoginSuccessfully() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest(
            "test@test.com",
            "password123"
        );
    
        mockMvc.perform(post("/api/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        LoginRequest loginRequest = new LoginRequest(
            "test@test.com",
            "password123"
        );


        MvcResult loginResult = mockMvc.perform(post("/api//auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                    .andExpect(status().isOk())
                    .andReturn();

        String responseBody = loginResult.getResponse().getContentAsString();

        AuthResponse authResponse = objectMapper.readValue(responseBody, AuthResponse.class);
        String token = authResponse.token();

        assertThat(responseBody).contains("token");
        assertThat(token).isNotBlank();
    }

    
}
