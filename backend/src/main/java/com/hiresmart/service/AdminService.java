package com.hiresmart.service;

import com.hiresmart.dto.AdminUserResponse;
import com.hiresmart.dto.JobResponse;
import com.hiresmart.entity.Job;
import com.hiresmart.entity.User;
import com.hiresmart.repository.ApplicationRepository;
import com.hiresmart.repository.JobRepository;
import com.hiresmart.repository.ProfileRepository;
import com.hiresmart.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final ProfileRepository profileRepository;

    public AdminService(UserRepository userRepository,
                         JobRepository jobRepository,
                         ApplicationRepository applicationRepository,
                         ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.profileRepository = profileRepository;
    }

    public List<AdminUserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(u -> new AdminUserResponse(u.getId(), u.getName(), u.getEmail(), u.getRole().name()))
                .toList();
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Remove their profile, if any
        profileRepository.findByUser(user).ifPresent(profileRepository::delete);

        // Remove applications they submitted as an applicant
        applicationRepository.findByApplicant(user).forEach(applicationRepository::delete);

        // If they're a recruiter, remove their jobs (and each job's applications first)
        List<Job> theirJobs = jobRepository.findByRecruiter(user);
        for (Job job : theirJobs) {
            applicationRepository.findByJob(job).forEach(applicationRepository::delete);
            jobRepository.delete(job);
        }

        userRepository.delete(user);
    }

    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(job -> new JobResponse(
                        job.getId(),
                        job.getTitle(),
                        job.getDescription(),
                        job.getRequirements(),
                        job.getLocation(),
                        job.getApplicationDeadline(),
                        job.getCreatedAt(),
                        job.getRecruiter().getName()
                ))
                .toList();
    }

    public void deleteJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        applicationRepository.findByJob(job).forEach(applicationRepository::delete);
        jobRepository.delete(job);
    }
}