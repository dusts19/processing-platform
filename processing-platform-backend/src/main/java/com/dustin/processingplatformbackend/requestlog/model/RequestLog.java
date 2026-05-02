package com.dustin.processingplatformbackend.requestlog.model;

import java.time.Instant;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name="request_log")
public class RequestLog {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, name = "user_id")
    private UUID userId;

    @Column(nullable = false, name = "api_key_id")
    private UUID apiKeyId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "http_method")
    private RequestMethod httpMethod;

    @Column(nullable = false, name = "endpoint")
    private String endpoint;

    @Column(nullable = false, name = "status_code")
    private Integer statusCode;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "status")
    private RequestStatus status;

    @Column(nullable = false, name = "latency_ms")
    private Long latencyMs;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Column(nullable = false, updatable = false, name = "created_at")
    private Instant createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = Instant.now();
    }
}
