package com.dustin.processingplatformbackend.apikey.model;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "api_keys")
public class ApiKey {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    
    @Column(nullable = false, name = "user_id")
    private UUID userId;

    @Column(nullable = false, name = "prefix")
    private String prefix;

    @Column(nullable = false, name = "key_hash")
    private String keyHash;

    @Column(nullable = false, name = "created_at")
    private Instant createdAt;

    
    @PrePersist
    public void prePersist() {
        this.createdAt = Instant.now();
    }
}
