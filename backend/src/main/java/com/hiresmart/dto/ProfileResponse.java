
package com.hiresmart.dto;

import java.time.LocalDateTime;

public class ProfileResponse {

    private String degree;
    private Integer yearsOfExperience;
    private String bio;
    private String skills;
    private String achievements;
    private String cvUrl;
    private LocalDateTime updatedAt;

    public ProfileResponse() {
    }

    public ProfileResponse(String degree, Integer yearsOfExperience, String bio, String skills,
                            String achievements, String cvUrl, LocalDateTime updatedAt) {
        this.degree = degree;
        this.yearsOfExperience = yearsOfExperience;
        this.bio = bio;
        this.skills = skills;
        this.achievements = achievements;
        this.cvUrl = cvUrl;
        this.updatedAt = updatedAt;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getAchievements() {
        return achievements;
    }

    public void setAchievements(String achievements) {
        this.achievements = achievements;
    }

    public String getCvUrl() {
        return cvUrl;
    }

    public void setCvUrl(String cvUrl) {
        this.cvUrl = cvUrl;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}