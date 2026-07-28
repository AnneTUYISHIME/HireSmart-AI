package com.hiresmart.controller;

import com.hiresmart.dto.JobRequest;
import com.hiresmart.dto.JobResponse;
import com.hiresmart.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Anyone can view all jobs - no login required
    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    // Anyone can view a single job's details
    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    // Only logged-in recruiters can create a job
    @PostMapping
    public ResponseEntity<JobResponse> createJob(@Valid @RequestBody JobRequest request,
                                                  Authentication authentication) {
        JobResponse response = jobService.createJob(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Only the recruiter who owns this job can update it
    @PutMapping("/{id}")
    public ResponseEntity<JobResponse> updateJob(@PathVariable Long id,
                                                  @Valid @RequestBody JobRequest request,
                                                  Authentication authentication) {
        JobResponse response = jobService.updateJob(id, request, authentication.getName());
        return ResponseEntity.ok(response);
    }

    // Only the recruiter who owns this job can delete it
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id, Authentication authentication) {
        jobService.deleteJob(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
