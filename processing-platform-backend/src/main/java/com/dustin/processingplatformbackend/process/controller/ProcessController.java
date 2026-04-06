package com.dustin.processingplatformbackend.process.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dustin.processingplatformbackend.process.dto.ProcessRequest;
import com.dustin.processingplatformbackend.process.dto.ProcessResponse;
import com.dustin.processingplatformbackend.process.service.ProcessService;

@RestController
@RequestMapping("/api/process")
public class ProcessController {

    private final ProcessService processService;

    public ProcessController(ProcessService processService) {
        this.processService = processService;
    }
    
    @PostMapping
    public ProcessResponse processInput(@RequestBody ProcessRequest processRequest) {

        return processService.process(processRequest);

    }
}
