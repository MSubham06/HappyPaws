package com.happypaws.petclinic.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.happypaws.petclinic.entity.Owner;
import com.happypaws.petclinic.entity.User;
import com.happypaws.petclinic.enums.UserRole;
import com.happypaws.petclinic.repository.OwnerRepository;
import com.happypaws.petclinic.repository.UserRepository;

@RestController
@RequestMapping("/api/owners")
@CrossOrigin(origins = "http://localhost:3000")
public class OwnerController {

    private final UserRepository userRepository;
    private final OwnerRepository ownerRepository;
    private final PasswordEncoder passwordEncoder;

    public OwnerController(UserRepository userRepository, OwnerRepository ownerRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.ownerRepository = ownerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ 1. GET ALL OWNERS (Fixes Admin Dashboard "Owners" Tab)
    @GetMapping
    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    // ✅ 2. GET CURRENT OWNER PROFILE (Fixes 404 Error on /api/owners/me)
    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(Authentication authentication) {
        String email = authentication.getName();
        
        // 1. Ensure User exists
        userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User login not found"));
        
        // 2. Find Owner by EMAIL
        return ownerRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).body(null)); // Returns 404 if Owner profile is missing
    }

    // ✅ 3. REGISTER NEW OWNER
    @PostMapping
    public ResponseEntity<?> registerOwner(@RequestBody Map<String, String> payload) {
        try {
            if (userRepository.findByEmail(payload.get("email")).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email already in use"));
            }

            // Create Login User
            User newUser = new User();
            newUser.setEmail(payload.get("email"));
            newUser.setPassword(passwordEncoder.encode(payload.get("password")));
            newUser.setRole(UserRole.OWNER); 
            User savedUser = userRepository.save(newUser);

            // Create Owner Profile
            Owner newOwner = new Owner();
            newOwner.setFirstName(payload.get("firstName"));
            newOwner.setLastName(payload.get("lastName"));
            newOwner.setPhone(payload.get("phone"));
            newOwner.setCity(payload.get("city"));
            newOwner.setAddress(payload.get("address"));
            newOwner.setEmail(payload.get("email")); // ✅ Linking by Email
            newOwner.setUser(savedUser); // Linking by Object

            ownerRepository.save(newOwner);

            return ResponseEntity.ok(Map.of("message", "Owner registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Error: " + e.getMessage()));
        }
    }
}