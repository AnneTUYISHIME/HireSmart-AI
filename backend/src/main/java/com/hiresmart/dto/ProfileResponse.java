package com.hiresmart.dto;

import java.time.LocalDateTime;

public class ProfileResponse {

    private String degree;
    private Integer yearsOfExperience;
    private String bio;
    private String skills;
    private String achievements;
    private String cvUrl;
    private String phone;
    private String contactEmail;
    private String linkedinUrl;
    private String githubUrl;
    private String portfolioUrl;
    private LocalDateTime updatedAt;

    public ProfileResponse() {
    }

    public ProfileResponse(String degree, Integer yearsOfExperience, String bio, String skills,
                            String achievements, String cvUrl, String phone, String contactEmail,
                            String linkedinUrl, String githubUrl, String portfolioUrl,
                            LocalDateTime updatedAt) {
        this.degree = degree;
        this.yearsOfExperience = yearsOfExperience;
        this.bio = bio;
        this.skills = skills;
        this.achievements = achievements;
        this.cvUrl = cvUrl;
        this.phone = phone;
        this.contactEmail = contactEmail;
        this.linkedinUrl = linkedinUrl;
        this.githubUrl = githubUrl;
        this.portfolioUrl = portfolioUrl;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getPortfolioUrl() {
        return portfolioUrl;
    }

    public void setPortfolioUrl(String portfolioUrl) {
        this.portfolioUrl = portfolioUrl;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}