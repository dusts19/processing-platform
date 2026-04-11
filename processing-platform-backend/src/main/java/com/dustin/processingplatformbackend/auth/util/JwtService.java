package com.dustin.processingplatformbackend.auth.util;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.dustin.processingplatformbackend.user.model.User;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor((jwtSecret.getBytes(StandardCharsets.UTF_8)));
    }
    
    public String generateAccessToken(User user) {
        return Jwts.builder()
            .subject(user.getId().toString())
            .claim("email", user.getEmail())
            .issuedAt(new Date())
            .expiration(Date.from(Instant.now().plus(7, ChronoUnit.DAYS)))
            .signWith(getSecretKey())
            .compact();
    }


    public UUID validateToken(String token) {

        try {
            return UUID.fromString(
                Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject()
            );
        } catch (JwtException e) {
            throw new RuntimeException("Invalid JWT");
        }
    }
}
