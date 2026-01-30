package com.happypaws.petclinic.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.happypaws.petclinic.entity.User;
import com.happypaws.petclinic.entity.Vet;
import com.happypaws.petclinic.repository.UserRepository;
import com.happypaws.petclinic.repository.VetRepository;
import com.happypaws.petclinic.service.VetService;

@RestController
@RequestMapping("/api/vets")
@CrossOrigin(origins = "http://localhost:3000")
public class VetController {

    private final VetService vetService;
    private final UserRepository userRepository;
    private final VetRepository vetRepository; // ✅ Added Repository

    public VetController(VetService vetService, UserRepository userRepository, VetRepository vetRepository) {
        this.vetService = vetService;
        this.userRepository = userRepository;
        this.vetRepository = vetRepository;
    }

    // ✅ 1. VET PROFILE (Fixes "Profile is not working")
    @GetMapping("/me")
    @PreAuthorize("hasAuthority('VET')")
    public Vet getMyProfile(Authentication authentication) {
        String email = authentication.getName();
        return vetRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Vet profile not found"));
    }

    // CREATE (Only Admins can create/hire Vets)
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')") 
    public Vet createVet(@RequestBody Vet vet) {
        if (vet.getEmail() != null) {
            // Link to User Login if it exists
            userRepository.findByEmail(vet.getEmail())
                    .ifPresent(vet::setUser);
        }
        return vetService.createVet(vet);
    }

    // READ ALL (Public - For Booking)
    @GetMapping
    public List<Vet> getAllVets() {
        return vetService.getAllVets();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Vet getVetById(@PathVariable Long id) {
        return vetService.getVetById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Vet updateVet(@PathVariable Long id, @RequestBody Vet vet) {
        return vetService.updateVet(id, vet);
    }

    // DELETE
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteVet(@PathVariable Long id) {
        vetService.deleteVet(id);
        return "Vet deleted successfully";
    }
}