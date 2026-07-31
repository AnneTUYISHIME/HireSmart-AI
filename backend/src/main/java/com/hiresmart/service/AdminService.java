package com.hiresmart.service;

import com.hiresmart.dto.AdminUserResponse;
import com.hiresmart.dto.ApplicationResponse;
import com.hiresmart.dto.JobResponse;
import com.hiresmart.entity.Job;
import com.hiresmart.entity.Role;
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
    private final ApplicationService applicationService;

    public AdminService(UserRepository userRepository,
                         JobRepository jobRepository,
                         ApplicationRepository applicationRepository,
                         ProfileRepository profileRepository,
                         ApplicationService applicationService) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.profileRepository = profileRepository;
        this.applicationService = applicationService;
    }

    public List<AdminUserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(u -> new AdminUserResponse(u.getId(), u.getName(), u.getEmail(), u.getRole().name()))
                .toList();
    }

    public AdminUserResponse updateUserRole(Long userId, String newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Role role;
        try {
            role = Role.valueOf(newRole.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Role must be one of: ADMIN, RECRUITER, APPLICANT");
        }

        user.setRole(role);
        User saved = userRepository.save(user);
        return new AdminUserResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole().name());
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        profileRepository.findByUser(user).ifPresent(profileRepository::delete);

        applicationRepository.findByApplicant(user).forEach(applicationRepository::delete);

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

    public List<ApplicationResponse> getAllApplications() {
        return applicationService.getAllApplicationsForAdmin();
    }

    public void deleteApplication(Long id) {
        applicationService.deleteApplicationAsAdmin(id);
    }
}