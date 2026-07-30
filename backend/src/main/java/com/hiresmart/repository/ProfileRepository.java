package com.hiresmart.repository;

import com.hiresmart.entity.Profile;
import com.hiresmart.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findByUser(User user);
}