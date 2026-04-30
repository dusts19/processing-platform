package com.dustin.processingplatformbackend.security;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dustin.processingplatformbackend.apikey.model.ApiKey;
import com.dustin.processingplatformbackend.apikey.repository.ApiKeyRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ApiKeyFilter extends OncePerRequestFilter{

    
    private final ApiKeyRepository apiKeyRepository;
    private final PasswordEncoder passwordEncoder;

    public ApiKeyFilter(ApiKeyRepository apiKeyRepository, PasswordEncoder passwordEncoder) {
        this.apiKeyRepository = apiKeyRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();

        if (!path.startsWith("/api/process")) {
            filterChain.doFilter(request, response);
            return;
        }

        Authentication existingAuth = SecurityContextHolder.getContext().getAuthentication();
        if (existingAuth != null) {
            filterChain.doFilter(request, response);
            return;
        }

        String rawKey = request.getHeader("x-api-key");

        if (rawKey == null || rawKey.isBlank()) {
            filterChain.doFilter(request, response);
            return;
        }



        if (!rawKey.startsWith("sk_test_") || rawKey.length() < 16){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String prefix = rawKey.substring(0, 16);
        
        Optional<ApiKey> optionalApiKey = apiKeyRepository.findByPrefix(prefix);

        if (optionalApiKey.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        ApiKey apiKey = optionalApiKey.get();

        if (!passwordEncoder.matches(rawKey, apiKey.getKeyHash())) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        AuthPrincipal principal = new AuthPrincipal(
            apiKey.getUserId(),
            apiKey.getId(),
            AuthType.API_KEY
        );

        UsernamePasswordAuthenticationToken auth = 
            new UsernamePasswordAuthenticationToken(
                principal, 
                null, 
                Collections.emptyList()
            );

        SecurityContextHolder.getContext().setAuthentication(auth);

        filterChain.doFilter(request, response);
    }

}
