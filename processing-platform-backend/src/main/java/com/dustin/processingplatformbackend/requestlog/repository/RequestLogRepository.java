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
    List<Object[]> getSummaryRaw(UUID userId);

    @Query("""
            SELECT
                CAST(r.createdAt AS DATE),
                COUNT(r),
                SUM(CASE WHEN r.statusCode BETWEEN 200 AND 299 THEN 1 ELSE 0 END),
                AVG(r.latencyMs)
            FROM RequestLog r
            WHERE r.userId = :userId
            GROUP BY CAST(r.createdAt AS DATE)
            ORDER BY CAST(r.createdAt AS DATE)
            """)
    List<Object[]> getTimeseriesRaw(UUID userId);
}


