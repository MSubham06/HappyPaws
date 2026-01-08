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

import com.happypaws.petclinic.entity.Visit;
import com.happypaws.petclinic.service.VisitService;

@RestController
@RequestMapping("/api/visits")
@CrossOrigin(origins = "*")
public class VisitController {

    private final VisitService visitService;

    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    // CREATE
    @PostMapping
    public Visit createVisit(@RequestBody Visit visit) {
        return visitService.createVisit(visit);
    }

    // READ ALL
    @GetMapping
    public List<Visit> getAllVisits() {
        return visitService.getAllVisits();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Visit getVisitById(@PathVariable Long id) {
        return visitService.getVisitById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Visit updateVisit(@PathVariable Long id, @RequestBody Visit visit) {
        return visitService.updateVisit(id, visit);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteVisit(@PathVariable Long id) {
        visitService.deleteVisit(id);
        return "Visit deleted successfully with id: " + id;
    }
    @PostMapping("/bulk")
    public List<Visit> createVisits(@RequestBody List<Visit> visits) {
    return visitService.createVisits(visits);
    }

}
