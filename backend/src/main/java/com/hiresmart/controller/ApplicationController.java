package com.hiresmart.controller;

import com.hiresmart.dto.ApplicationRequest;
import com.hiresmart.dto.ApplicationResponse;
import com.hiresmart.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Applicant applies to a job
    @PostMapping
    public ResponseEntity<ApplicationResponse> apply(@Valid @RequestBody ApplicationRequest request,
                                                       Authentication authentication) {
        ApplicationResponse response = applicationService.applyToJob(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Applicant views their own applications
    @GetMapping("/me")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(Authentication authentication) {
        return ResponseEntity.ok(applicationService.getMyApplications(authentication.getName()));
    }

    // Recruiter views who applied to a specific job they posted
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsForJob(@PathVariable Long jobId,
                                                                            Authentication authentication) {
        return ResponseEntity.ok(applicationService.getApplicationsForJob(jobId, authentication.getName()));
    }
}