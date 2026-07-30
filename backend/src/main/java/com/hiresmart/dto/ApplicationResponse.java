package com.hiresmart.dto;

import java.time.LocalDateTime;

public class ApplicationResponse {

    private Long id;
    private String jobTitle;
    private String applicantName;
    private String applicantEmail;
    private String status;
    private Double aiScore;
    private String degree;
    private Integer yearsOfExperience;
    private String coverLetter;
    private String cvUrl;
    private LocalDateTime appliedAt;

    public ApplicationResponse() {
    }

    public ApplicationResponse(Long id, String jobTitle, String applicantName, String applicantEmail,
                                String status, Double aiScore, String degree, Integer yearsOfExperience,
                                String coverLetter, String cvUrl, LocalDateTime appliedAt) {
        this.id = id;
        this.jobTitle = jobTitle;
        this.applicantName = applicantName;
        this.applicantEmail = applicantEmail;
        this.status = status;
        this.aiScore = aiScore;
        this.degree = degree;
        this.yearsOfExperience = yearsOfExperience;
        this.coverLetter = coverLetter;
        this.cvUrl = cvUrl;
        this.appliedAt = appliedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public void setApplicantEmail(String applicantEmail) {
        this.applicantEmail = applicantEmail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getAiScore() {
        return aiScore;
    }

    public void setAiScore(Double aiScore) {
        this.aiScore = aiScore;
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

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public String getCvUrl() {
        return cvUrl;
    }

    public void setCvUrl(String cvUrl) {
        this.cvUrl = cvUrl;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }
}