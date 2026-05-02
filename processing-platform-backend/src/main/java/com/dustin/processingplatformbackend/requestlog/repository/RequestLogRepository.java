package com.dustin.processingplatformbackend.requestlog.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dustin.processingplatformbackend.requestlog.model.RequestLog;

public interface RequestLogRepository extends JpaRepository<RequestLog, UUID> {
    List<RequestLog> findByUserIdOrderByCreatedAtDesc(UUID userId);

    @Query("""
            SELECT 
                COUNT(r),
                AVG(r.latencyMs),
                SUM(CASE WHEN r.statusCode BETWEEN 200 AND 299 THEN 1 ELSE 0 END)
            FROM RequestLog r
            WHERE r.userId = :userId
            """)
    Object[] getSummaryRaw(UUID userId);
}
