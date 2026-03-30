package com.dustin.processingplatformbackend.auth.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dustin.processingplatformbackend.auth.model.User;

public interface UserRepository extends JpaRepository<User, UUID>{
    Optional<User> findByEmail(String email);
}
