package com.hiresmart.service;

import com.hiresmart.dto.ProfileRequest;
import com.hiresmart.dto.ProfileResponse;
import com.hiresmart.entity.Profile;
import com.hiresmart.entity.User;
import com.hiresmart.repository.ProfileRepository;
import com.hiresmart.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    // Returns the user's profile, or an empty one if they haven't created it yet
    public ProfileResponse getMyProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return profileRepository.findByUser(user)
                .map(this::toResponse)
                .orElse(new ProfileResponse(null, null, null, null, null, null, null));
    }

    // Creates the profile if it doesn't exist yet, or updates it if it does
    public ProfileResponse saveMyProfile(ProfileRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Profile profile = profileRepository.findByUser(user)
                .orElse(new Profile(user));

        profile.setDegree(request.getDegree());
        profile.setYearsOfExperience(request.getYearsOfExperience());
        profile.setBio(request.getBio());
        profile.setSkills(request.getSkills());
        profile.setAchievements(request.getAchievements());
        profile.setCvUrl(request.getCvUrl());
        profile.setUpdatedAt(LocalDateTime.now());

        Profile saved = profileRepository.save(profile);
        return toResponse(saved);
    }

    private ProfileResponse toResponse(Profile profile) {
        return new ProfileResponse(
                profile.getDegree(),
                profile.getYearsOfExperience(),
                profile.getBio(),
                profile.getSkills(),
                profile.getAchievements(),
                profile.getCvUrl(),
                profile.getUpdatedAt()
        );
    }
}