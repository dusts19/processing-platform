package com.dustin.processingplatformbackend.security.jwt;

import java.io.IOException;
import java.util.Collections;
import java.util.UUID;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dustin.processingplatformbackend.security.model.AuthPrincipal;
import com.dustin.processingplatformbackend.security.model.AuthType;
import com.dustin.processingplatformbackend.user.model.User;
import com.dustin.processingplatformbackend.user.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFilter extends OncePerRequestFilter{

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();

        if (path.startsWith("/api/process")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        Authentication existingAuth = SecurityContextHolder.getContext().getAuthentication();
        if (
            existingAuth != null && 
            existingAuth.isAuthenticated() && 
            !(existingAuth instanceof AnonymousAuthenticationToken)
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        // System.out.println("JWT: " + token);
        try {
            UUID userId = jwtService.validateToken(token);
            User user = userRepository.findById(userId).orElse(null);

            if (user == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            AuthPrincipal principal = new AuthPrincipal(
                user.getId(),
                null,
                AuthType.JWT
            );

            UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(
                    principal,
                    null,
                    Collections.emptyList()
            );

            SecurityContextHolder.getContext().setAuthentication(authToken);

        } catch (RuntimeException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        filterChain.doFilter(request, response);
    }

    
}
