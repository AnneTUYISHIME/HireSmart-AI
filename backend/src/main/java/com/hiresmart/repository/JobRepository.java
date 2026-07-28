package com.hiresmart.repository;

import com.hiresmart.entity.Job;
import com.hiresmart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    // Get all jobs posted by a specific recruiter
    List<Job> findByRecruiter(User recruiter);
}