package com.happypaws.petclinic.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.happypaws.petclinic.entity.Owner;
import com.happypaws.petclinic.entity.User;
import com.happypaws.petclinic.repository.OwnerRepository;
import com.happypaws.petclinic.repository.UserRepository;
import com.happypaws.petclinic.service.OwnerService;

@RestController
@RequestMapping("/api/owners")
@CrossOrigin(origins = "*")
public class OwnerController {

    private final OwnerService ownerService;
    private final UserRepository userRepository;
    private final OwnerRepository ownerRepository; 

    public OwnerController(OwnerService ownerService, UserRepository userRepository, OwnerRepository ownerRepository) {
        this.ownerService = ownerService;
        this.userRepository = userRepository;
        this.ownerRepository = ownerRepository;
    }

    // 1. CREATE PROFILE
    @PostMapping
    @PreAuthorize("hasRole('OWNER')") // <--- CHANGED: Matches 'ROLE_OWNER' token
    public Owner createProfile(@RequestBody Owner owner, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        owner.setUser(user); 
        return ownerService.createOwner(owner);
    }

    // 2. GET MY PROFILE
    @GetMapping("/me")
    @PreAuthorize("hasRole('OWNER')") // <--- CHANGED
    public ResponseEntity<Owner> getMyProfile(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        
        return ownerRepository.findByUserId(user.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. GET ALL (Admin Only)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')") // <--- CHANGED: Matches 'ROLE_ADMIN' token
    public List<Owner> getAllOwners() {
        return ownerService.getAllOwners();
    }

    // 4. GET BY ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // <--- CHANGED
    public Owner getOwnerById(@PathVariable Long id) {
        return ownerService.getOwnerById(id);
    }
}