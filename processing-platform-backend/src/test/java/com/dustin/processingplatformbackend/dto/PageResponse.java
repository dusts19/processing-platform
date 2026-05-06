package com.dustin.processingplatformbackend.dto;

import java.util.List;

public class PageResponse<T> {
    public List<T> content;
    public int totalPages;
    public int number;
};
