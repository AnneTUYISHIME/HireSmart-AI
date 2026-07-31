package com.hiresmart.service;

import com.hiresmart.dto.ApplicationRequest;
import com.hiresmart.dto.ApplicationResponse;
import com.hiresmart.entity.Application;
import com.hiresmart.entity.ApplicationStatus;
import com.hiresmart.entity.Job;
import com.hiresmart.entity.User;
import com.hiresmart.repository.ApplicationRepository;
import com.hiresmart.repository.JobRepository;
import com.hiresmart.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                               JobRepository jobRepository,
                               UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
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

        Application saved = applicationRepository.save(application);
        return toResponse(saved);
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

        ApplicationStatus status;
        try {
            status = ApplicationStatus.valueOf(newStatus.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Status must be one of: PENDING, REVIEWED, ACCEPTED, REJECTED");
        }

        application.setStatus(status);
        Application saved = applicationRepository.save(application);
        return toResponse(saved);
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