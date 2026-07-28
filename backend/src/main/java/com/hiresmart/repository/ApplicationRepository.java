package com.hiresmart.repository;

import com.hiresmart.entity.Application;
import com.hiresmart.entity.Job;
import com.hiresmart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // All applications a specific applicant has submitted
    List<Application> findByApplicant(User applicant);

    // All applications submitted for a specific job (recruiter's view)
    List<Application> findByJob(Job job);

    // Prevents the same applicant from applying to the same job twice
    boolean existsByApplicantAndJob(User applicant, Job job);
}
