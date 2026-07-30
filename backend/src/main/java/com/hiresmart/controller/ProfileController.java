package com.hiresmart.controller;

import com.hiresmart.dto.ProfileRequest;
import com.hiresmart.dto.ProfileResponse;
import com.hiresmart.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> getMyProfile(Authentication authentication) {
        return ResponseEntity.ok(profileService.getMyProfile(authentication.getName()));
    }

    @PutMapping
    public ResponseEntity<ProfileResponse> saveMyProfile(@RequestBody ProfileRequest request,
                                                          Authentication authentication) {
        return ResponseEntity.ok(profileService.saveMyProfile(request, authentication.getName()));
    }
}