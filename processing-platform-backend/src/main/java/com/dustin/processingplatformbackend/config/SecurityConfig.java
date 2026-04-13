package com.dustin.processingplatformbackend.config;

import com.dustin.processingplatformbackend.apikey.repository.ApiKeyRepository;
import com.dustin.processingplatformbackend.auth.util.JwtService;
import com.dustin.processingplatformbackend.security.ApiKeyFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.dustin.processingplatformbackend.security.JwtFilter;
import com.dustin.processingplatformbackend.user.repository.UserRepository;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(
        HttpSecurity http, 
        JwtFilter jwtFilter, 
        ApiKeyFilter apiKeyFilter
    ) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .anyRequest().authenticated()
            )
            .headers(headers -> headers.frameOptions((frame -> frame.disable())))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(apiKeyFilter, JwtFilter.class);
        return http.build();
    }

    @Bean
    public JwtFilter jwtFilter(UserRepository repo, JwtService jwtService) {
        return new JwtFilter(jwtService, repo);
    }

    @Bean
    public ApiKeyFilter apiKeyFilter(ApiKeyRepository repo, PasswordEncoder passwordEncoder) {
        return new ApiKeyFilter(repo, passwordEncoder);
    }
}
