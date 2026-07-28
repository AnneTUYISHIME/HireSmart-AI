package com.hiresmart.service;

import com.hiresmart.dto.JobRequest;
import com.hiresmart.dto.JobResponse;
import com.hiresmart.entity.Job;
import com.hiresmart.entity.User;
import com.hiresmart.repository.JobRepository;
import com.hiresmart.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobService(JobRepository jobRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    public JobResponse createJob(JobRequest request, String recruiterEmail) {
        User recruiter = userRepository.findByEmail(recruiterEmail)
                .orElseThrow(() -> new IllegalArgumentException("Recruiter not found"));

        Job job = new Job(
                request.getTitle(),
                request.getDescription(),
                request.getRequirements(),
                request.getLocation(),
                recruiter
        );

        Job saved = jobRepository.save(job);
        return toResponse(saved);
    }

    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));
        return toResponse(job);
    }

    public JobResponse updateJob(Long id, JobRequest request, String recruiterEmail) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        if (!job.getRecruiter().getEmail().equals(recruiterEmail)) {
            throw new SecurityException("You can only update jobs you created");
        }

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setRequirements(request.getRequirements());
        job.setLocation(request.getLocation());

        Job updated = jobRepository.save(job);
        return toResponse(updated);
    }

    public void deleteJob(Long id, String recruiterEmail) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        if (!job.getRecruiter().getEmail().equals(recruiterEmail)) {
            throw new SecurityException("You can only delete jobs you created");
        }

        jobRepository.delete(job);
    }

    private JobResponse toResponse(Job job) {
        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getRequirements(),
                job.getLocation(),
                job.getCreatedAt(),
                job.getRecruiter().getName()
        );
    }
}
