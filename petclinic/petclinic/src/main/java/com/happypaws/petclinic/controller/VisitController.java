package com.happypaws.petclinic.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.happypaws.petclinic.entity.Pet;
import com.happypaws.petclinic.entity.Vet;
import com.happypaws.petclinic.entity.Visit;
import com.happypaws.petclinic.repository.PetRepository;
import com.happypaws.petclinic.repository.VetRepository;
import com.happypaws.petclinic.repository.VisitRepository;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    @Autowired
    private VisitRepository visitRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private VetRepository vetRepository;

    // ================= GET ALL VISITS =================
    @GetMapping
    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }

    // ================= GET VISIT BY ID =================
    @GetMapping("/{id}")
    public ResponseEntity<Visit> getVisitById(@PathVariable Long id) {
        Optional<Visit> visit = visitRepository.findById(id);
        return visit.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ================= CREATE VISIT =================
    @PostMapping
    public ResponseEntity<?> createVisit(@RequestBody Visit visit) {

        if (visit.getPet() == null || visit.getVet() == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Pet ID and Vet ID must be provided");
        }

        Long petId = visit.getPet().getId();
        Long vetId = visit.getVet().getId();

        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found with ID: " + petId));

        Vet vet = vetRepository.findById(vetId)
                .orElseThrow(() -> new RuntimeException("Vet not found with ID: " + vetId));

        visit.setPet(pet);
        visit.setVet(vet);

        Visit savedVisit = visitRepository.save(visit);
        return ResponseEntity.ok(savedVisit);
    }

    // ================= UPDATE VISIT =================
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVisit(
            @PathVariable Long id,
            @RequestBody Visit visitDetails) {

        Optional<Visit> optionalVisit = visitRepository.findById(id);

        if (!optionalVisit.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Visit visit = optionalVisit.get();
        visit.setVisitDate(visitDetails.getVisitDate());
        visit.setDescription(visitDetails.getDescription());

        if (visitDetails.getPet() != null) {
            Pet pet = petRepository.findById(
                    visitDetails.getPet().getId()).orElseThrow();
            visit.setPet(pet);
        }

        if (visitDetails.getVet() != null) {
            Vet vet = vetRepository.findById(
                    visitDetails.getVet().getId()).orElseThrow();
            visit.setVet(vet);
        }

        return ResponseEntity.ok(visitRepository.save(visit));
    }

    // ================= DELETE VISIT =================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        Optional<Visit> visit = visitRepository.findById(id);
        if (visit.isPresent()) {
            visitRepository.delete(visit.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
