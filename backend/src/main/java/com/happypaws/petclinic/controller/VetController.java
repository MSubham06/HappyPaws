package com.happypaws.petclinic.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.happypaws.petclinic.entity.User;
import com.happypaws.petclinic.entity.Vet;
import com.happypaws.petclinic.repository.UserRepository;
import com.happypaws.petclinic.service.VetService;

@RestController
@RequestMapping("/api/vets")
@CrossOrigin(origins = "*")
public class VetController {

    private final VetService vetService;
    private final UserRepository userRepository;

    public VetController(VetService vetService, UserRepository userRepository) {
        this.vetService = vetService;
        this.userRepository = userRepository;
    }

    // CREATE (Only Admins can create/hire Vets)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // <--- CHANGED
    public Vet createVet(@RequestBody Vet vet) {
        if (vet.getEmail() != null) {
            User user = userRepository.findByEmail(vet.getEmail())
                    .orElseThrow(() -> new RuntimeException("User login not found for email: " + vet.getEmail()));
            
            vet.setUser(user);
        }
        return vetService.createVet(vet);
    }

    // READ ALL (Public)
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
    @PreAuthorize("hasRole('ADMIN')") // <--- CHANGED
    public Vet updateVet(@PathVariable Long id, @RequestBody Vet vet) {
        return vetService.updateVet(id, vet);
    }

    // DELETE
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // <--- CHANGED
    public String deleteVet(@PathVariable Long id) {
        vetService.deleteVet(id);
        return "Vet deleted successfully";
    }
}