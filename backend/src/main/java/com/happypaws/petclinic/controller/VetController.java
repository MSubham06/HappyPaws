package com.happypaws.petclinic.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.happypaws.petclinic.entity.Vet;
import com.happypaws.petclinic.service.VetService;

@RestController
@RequestMapping("/api/vets")
@CrossOrigin(origins = "*")
public class VetController {

    private final VetService vetService;

    // ✅ Constructor Injection (IMPORTANT)
    public VetController(VetService vetService) {
        this.vetService = vetService;
    }

    // CREATE
    @PostMapping
    public Vet createVet(@RequestBody Vet vet) {
        return vetService.createVet(vet);
    }

    // READ ALL
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
    public Vet updateVet(@PathVariable Long id, @RequestBody Vet vet) {
        return vetService.updateVet(id, vet);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteVet(@PathVariable Long id) {
        vetService.deleteVet(id);
        return "Vet deleted successfully";
    }
}
