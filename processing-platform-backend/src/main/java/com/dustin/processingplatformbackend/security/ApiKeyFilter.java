package com.dustin.processingplatformbackend.security;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

@Component
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

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String rawKey = authHeader.substring(7);


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

        request.setAttribute("userId", apiKey.getUserId());
        request.setAttribute("apikeyId", apiKey.getId());

        UsernamePasswordAuthenticationToken auth = 
            new UsernamePasswordAuthenticationToken(
                apiKey.getUserId(), 
                null, 
                Collections.emptyList()
            );

        SecurityContextHolder.getContext().setAuthentication(auth);

        filterChain.doFilter(request, response);
    }

}
