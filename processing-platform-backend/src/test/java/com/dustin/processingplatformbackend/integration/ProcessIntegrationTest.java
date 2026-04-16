package com.dustin.processingplatformbackend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.dustin.processingplatformbackend.apikey.dto.ApiKeyResponse;
import com.dustin.processingplatformbackend.process.dto.ProcessRequest;
import com.dustin.processingplatformbackend.process.dto.ProcessResponse;
import com.dustin.processingplatformbackend.util.TestAuthHelper;
// import com.fasterxml.jackson.databind.ObjectMapper;
import tools.jackson.databind.ObjectMapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ProcessIntegrationTest {
    
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void processInput_should_return_true() throws Exception{


        String jwtToken = TestAuthHelper.registerAndLogin(
            mockMvc, 
            objectMapper, 
            "test" + System.currentTimeMillis() + "@example.com"
        );

        MvcResult apiKeyResult = mockMvc.perform(
            post("/api/api-keys")
                .header("Authorization", "Bearer " + jwtToken)
        )
        .andExpect(status().isOk())
        .andReturn();

        String apiKeyResponseBody = apiKeyResult.getResponse().getContentAsString();

        ApiKeyResponse apiKeyResponse = objectMapper.readValue(apiKeyResponseBody, ApiKeyResponse.class);

        String apiKeyToken = apiKeyResponse.key();

        ProcessRequest processRequest = new ProcessRequest(
            "Hello World",
            "text"
        );
        
        MvcResult processResult = mockMvc.perform(
            post("/api/process")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + apiKeyToken)
                .content(objectMapper.writeValueAsString(processRequest))
        )
        .andExpect(status().isOk())
        .andReturn();

        String processResponseBody = processResult.getResponse().getContentAsString();

        ProcessResponse processResponse = objectMapper.readValue(processResponseBody, ProcessResponse.class);
        
        assertEquals(11, processResponse.length());
        assertEquals(2, processResponse.wordCount());
        assertEquals("HELLO WORLD", processResponse.uppercase());
        assertThat(processResponse.processingTimeMs()).isNotNull();
    }
}
