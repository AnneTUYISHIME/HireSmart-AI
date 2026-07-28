package com.hiresmart.dto;

import java.time.LocalDateTime;

public class JobResponse {

    private Long id;
    private String title;
    private String description;
    private String requirements;
    private String location;
    private LocalDateTime createdAt;
    private String recruiterName;

    public JobResponse() {
    }

    public JobResponse(Long id, String title, String description, String requirements,
                        String location, LocalDateTime createdAt, String recruiterName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.location = location;
        this.createdAt = createdAt;
        this.recruiterName = recruiterName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getRecruiterName() {
        return recruiterName;
    }

    public void setRecruiterName(String recruiterName) {
        this.recruiterName = recruiterName;
    }
}