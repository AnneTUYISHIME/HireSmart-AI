package com.hiresmart.service;

import com.hiresmart.dto.ApplicationRequest;
import com.hiresmart.dto.ApplicationResponse;
import com.hiresmart.entity.Application;
import com.hiresmart.entity.Job;
import com.hiresmart.entity.User;
import com.hiresmart.repository.ApplicationRepository;
import com.hiresmart.repository.JobRepository;
import com.hiresmart.repository.ProfileRepository;
import com.hiresmart.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                               JobRepository jobRepository,
                               UserRepository userRepository,
                               ProfileRepository profileRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    public ApplicationResponse applyToJob(ApplicationRequest request, String applicantEmail) {
        User applicant = userRepository.findByEmail(applicantEmail)
                .orElseThrow(() -> new IllegalArgumentException("Applicant not found"));

        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        if (applicationRepository.existsByApplicantAndJob(applicant, job)) {
            throw new IllegalArgumentException("You have already applied to this job");
        }

        Application application = new Application(
                applicant,
                job,
                request.getDegree(),
                request.getYearsOfExperience(),
                request.getCoverLetter(),
                request.getCvUrl()
        );

        Double matchScore = calculateMatchScore(job, applicant, request);
        application.setAiScore(matchScore);

        Application saved = applicationRepository.save(application);
        return toResponse(saved);
    }

    // Compares job requirements against the applicant's profile skills, bio, and cover letter
    // to produce a percentage match score - no external AI service needed.
    private Double calculateMatchScore(Job job, User applicant, ApplicationRequest request) {
        if (job.getRequirements() == null || job.getRequirements().isBlank()) {
            return null;
        }

        String[] keywords = job.getRequirements().toLowerCase().split(",");

        StringBuilder combined = new StringBuilder();
        if (request.getDegree() != null) {
            combined.append(request.getDegree().toLowerCase()).append(" ");
        }
        if (request.getCoverLetter() != null) {
            combined.append(request.getCoverLetter().toLowerCase()).append(" ");
        }

        profileRepository.findByUser(applicant).ifPresent(profile -> {
            if (profile.getSkills() != null) {
                combined.append(profile.getSkills().toLowerCase()).append(" ");
            }
            if (profile.getBio() != null) {
                combined.append(profile.getBio().toLowerCase()).append(" ");
            }
            if (profile.getAchievements() != null) {
                combined.append(profile.getAchievements().toLowerCase()).append(" ");
            }
        });

        String text = combined.toString();

        int matched = 0;
        int total = 0;
        for (String keyword : keywords) {
            String trimmed = keyword.trim();
            if (trimmed.isEmpty()) {
                continue;
            }
            total++;
            if (text.contains(trimmed)) {
                matched++;
            }
        }

        if (total == 0) {
            return null;
        }

        double score = ((double) matched / total) * 100;
        return Math.round(score * 10.0) / 10.0;
    }

    public List<ApplicationResponse> getMyApplications(String applicantEmail) {
        User applicant = userRepository.findByEmail(applicantEmail)
                .orElseThrow(() -> new IllegalArgumentException("Applicant not found"));

        return applicationRepository.findByApplicant(applicant)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ApplicationResponse> getApplicationsForJob(Long jobId, String recruiterEmail) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        if (!job.getRecruiter().getEmail().equals(recruiterEmail)) {
            throw new SecurityException("You can only view applicants for jobs you created");
        }

        return applicationRepository.findByJob(job)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ApplicationResponse updateStatus(Long applicationId, String newStatus, String recruiterEmail) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));

        if (!application.getJob().getRecruiter().getEmail().equals(recruiterEmail)) {
            throw new SecurityException("You can only update applications for jobs you posted");
        }

        com.hiresmart.entity.ApplicationStatus status;
        try {
            status = com.hiresmart.entity.ApplicationStatus.valueOf(newStatus.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Status must be one of: PENDING, REVIEWED, ACCEPTED, REJECTED");
        }

        application.setStatus(status);
        Application saved = applicationRepository.save(application);
        return toResponse(saved);
    }

    public List<ApplicationResponse> getAllApplicationsForAdmin() {
        return applicationRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public void deleteApplicationAsAdmin(Long id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));
        applicationRepository.delete(application);
    }

    private ApplicationResponse toResponse(Application application) {
        return new ApplicationResponse(
                application.getId(),
                application.getJob().getTitle(),
                application.getApplicant().getName(),
                application.getApplicant().getEmail(),
                application.getStatus().name(),
                application.getAiScore(),
                application.getDegree(),
                application.getYearsOfExperience(),
                application.getCoverLetter(),
                application.getCvUrl(),
                application.getAppliedAt()
        );
    }
}