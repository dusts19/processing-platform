package com.dustin.processingplatformbackend.user.model;

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


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false, name="email")
    private String email;

    @Column(nullable = false, name="password_hash")
    private String passwordHash;

    @Column(nullable = false, updatable = false, name="created_at")
    private Instant createdAt;
    

    @PrePersist
    public void prePersist() {
        this.createdAt = Instant.now();
    }
}
