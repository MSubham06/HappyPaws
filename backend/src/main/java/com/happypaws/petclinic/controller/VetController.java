package com.happypaws.petclinic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.happypaws.petclinic.entity.Vet;
import com.happypaws.petclinic.service.VetService;

@RestController
@RequestMapping("/api/vets")
public class VetController {

    @Autowired
    private VetService vetService;

    @PostMapping
    public Vet addVet(@RequestBody Vet vet) {
        return vetService.saveVet(vet);
    }

    @GetMapping
    public List<Vet> getAllVets() {
        return vetService.getAllVets();
    }

    @GetMapping("/{id}")
    public Vet getVetById(@PathVariable Long id) {
        return vetService.getVetById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteVet(@PathVariable Long id) {
        vetService.deleteVet(id);
        return "Vet deleted successfully";
    }
}
