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

import com.happypaws.petclinic.entity.Visit;
import com.happypaws.petclinic.service.VisitService;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    @Autowired
    private VisitService visitService;

    @PostMapping
    public Visit addVisit(@RequestBody Visit visit) {
        return visitService.saveVisit(visit);
    }

    @GetMapping
    public List<Visit> getAllVisits() {
        return visitService.getAllVisits();
    }

    @GetMapping("/{id}")
    public Visit getVisitById(@PathVariable Long id) {
        return visitService.getVisitById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteVisit(@PathVariable Long id) {
        visitService.deleteVisit(id);
        return "Visit deleted successfully";
    }
}
