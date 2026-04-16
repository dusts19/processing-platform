package com.dustin.processingplatformbackend.integration;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.dustin.processingplatformbackend.apikey.dto.ApiKeyResponse;
import com.dustin.processingplatformbackend.util.TestAuthHelper;
// import com.fasterxml.jackson.databind.ObjectMapper;

import tools.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ApiKeyIntegrationTest {
    
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void createApiKey_should_return_success() throws Exception {

        String email = "test" + System.currentTimeMillis() + "@test.com";

        String jwtToken = TestAuthHelper.registerAndLogin(mockMvc, objectMapper, email);

        assertThat(jwtToken).isNotEmpty();

        MvcResult mvcResult = mockMvc.perform(post("/api/api-keys")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + jwtToken))
                    .andExpect(status().isOk())
                    .andReturn();

        String responseBody = mvcResult.getResponse().getContentAsString();

        ApiKeyResponse apiKeyResponse = objectMapper.readValue(responseBody, ApiKeyResponse.class);

        String apiKeyToken = apiKeyResponse.key();

        assertThat(apiKeyToken).startsWith("sk_test_");
        assertThat(apiKeyResponse.id()).isNotNull();
        assertThat(apiKeyResponse.createdAt()).isNotNull();
    }
}
