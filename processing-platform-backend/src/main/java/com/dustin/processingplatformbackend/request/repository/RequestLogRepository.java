package com.dustin.processingplatformbackend.request.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dustin.processingplatformbackend.request.model.RequestLog;

public interface RequestLogRepository extends JpaRepository<RequestLog, UUID> {
    
}
