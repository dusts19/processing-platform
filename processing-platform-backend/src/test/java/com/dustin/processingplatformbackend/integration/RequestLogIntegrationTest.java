package com.dustin.processingplatformbackend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.dustin.processingplatformbackend.apikey.dto.ApiKeyResponse;
import com.dustin.processingplatformbackend.process.dto.ProcessRequest;
import com.dustin.processingplatformbackend.requestlog.dto.RequestLogResponse;
import com.dustin.processingplatformbackend.requestlog.model.RequestStatus;
import com.dustin.processingplatformbackend.util.TestAuthHelper;

import tools.jackson.core.type.TypeReference;
// import com.fasterxml.jackson.core.type.TypeReference;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
@AutoConfigureMockMvc
public class RequestLogIntegrationTest {
    
    @Autowired
    MockMvc mockMvc;

    @Autowired
    JsonMapper jsonMapper;

    @Test
    void getRequestLogs_should_return_true() throws Exception {
        
        String jwtString = TestAuthHelper.registerAndLogin(
            mockMvc, 
            jsonMapper, 
            "test" + System.currentTimeMillis() + "@example.com"
        );


        MvcResult apiKeyResult = mockMvc.perform(
            post("/api/api-keys")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + jwtString)
        )
        .andExpect(status().isOk())
        .andReturn();

        String apiKeyResponseBody = apiKeyResult.getResponse().getContentAsString();

        ApiKeyResponse apiKeyResponse = jsonMapper.readValue(apiKeyResponseBody,  ApiKeyResponse.class);

        String apiKeyString = apiKeyResponse.key();

        ProcessRequest processRequest = new ProcessRequest(
            "Hello World",
            "text"
        );

        MvcResult processResult = mockMvc.perform(
            post("/api/process")
            .contentType(MediaType.APPLICATION_JSON)
            .header("x-api-key", apiKeyString)
            .content(jsonMapper.writeValueAsString(processRequest))
        )
        .andExpect(status().isOk())
        .andReturn();

        MvcResult requestLogResult = mockMvc.perform(
            get("/api/requests")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + jwtString)
        )
        .andExpect(status().isOk())
        .andReturn();
        
        String requestLogResponseBody = requestLogResult.getResponse().getContentAsString();
        
        // List<RequestLogResponse> logs = jsonMapper.readValue(requestLogResponseBody, new TypeReference() {
            
        // })
        // List<RequestLogResponse> logs = jsonMapper.readValue(requestLogResponseBody, );
        List<RequestLogResponse> logs = jsonMapper.readValue(requestLogResponseBody, new TypeReference<List<RequestLogResponse>>() {});
        
        RequestLogResponse requestLogResponse = logs.get(0);

        int processStatus = processResult.getResponse().getStatus();


        assertThat(requestLogResponse).isNotNull();
        assertThat(requestLogResponse.id()).isNotNull();
        
        assertEquals("POST", requestLogResponse.httpMethod());
        assertEquals("/api/process", requestLogResponse.endpoint());
        assertEquals(200, requestLogResponse.statusCode());
        assertEquals(RequestStatus.SUCCESS, requestLogResponse.status());
        assertThat(requestLogResponse.latencyMs()).isNotNull();
        assertThat(requestLogResponse.createdAt()).isNotNull();

        assertEquals(processStatus, requestLogResponse.statusCode());
        
    }
}
